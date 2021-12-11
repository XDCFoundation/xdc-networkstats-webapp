import io from "socket.io-client";
import Utils, {dispatchAction} from "../utility";
import {eventConstants} from "../constants";
import _ from 'lodash';
import store from '../store'
import moment from 'moment'
// export default {
//     connectSocket
// }
let MAX_BINS = 40;
let nodes = [];
let totalNodes = 0;
let countries = 0;
let bestBlock = 0;
let avgTime = 0;
let lastBlock = 0;
let tableRows = [];
let gasPrice = 0;
let avgRate = 0;
let upTime = 0;
let bestStats = {};
let lastDifficulty = 0;
let nodesActive = 0;
let blockPropagationChart = [];
let blockPropagationAvg = 0;
let uncleCount = 0;
let uncleCountChart = _.fill(Array(40), 2);
let avgBlockTime = 0;
let avgTransactionRate = 0;
let avgHashrate = 0;
let lastGasLimit = _.fill(Array(40), 2);
let lastBlocksTime = _.fill(Array(40), 2);
let difficultyChart = _.fill(Array(40), 2);
let transactionDensity = _.fill(Array(MAX_BINS), 2);
let gasSpending = _.fill(Array(MAX_BINS), 2);
let miners = [];
let node = [];

// async function connectSocket(){
    // const socket = io.connect("wss://stats1.xinfin.network/primus/?_primuscb=1633499928674-0");

    console.log('line 38383838383838383838383838383838338383838');

    const socket = io("http://3.88.252.78:3000/", {
      path: "/stats-data/",
      transports: ["websocket"],
      reconnection: true,
    });


    // store.dispatch({type: eventConstants.UPDATE_BEST_BLOCK, data: 888888888})

    socket.on('open', function open(){
        socket.emit('ready');
        console.log('The connection has been opened.');
    })

    socket.on('end', function end(){
        console.log('Socket connection ended.')
    })

    socket.on('error', function error(err){
        console.log(err);
    })

    socket.on('reconnecting', function reconnecting(opts) {
        console.log('We are scheduling a reconnect operation', opts);
    })

    socket.on('network-stats-data', function node(data){
         
        //  if(data.action === "block"){
        //     console.log("block agya");
        // }
        if(data.action === "update"){
            console.log("update agya");
        }

        socketAction(data.action, data.data);
    });

    socket.on('network-stats-nodes', function node(data){
        if(!_.isEmpty(data.nodes))
        socketAction("network-stats-nodes", data.nodes);
        nodes = data.nodes;
        // console.log(data.nodes[0],"..........");
        // data.nodes.map((value)=>{
        // //   console.log(value,"./////gy///////////////");
        //   var arr = _.chunk(value,100);
        //   console.log(arr);
        // })
        // console.log("./////////////////////////s/", msg);
    });

    socket.on('client-latency', function(data) {
        // $scope.latency = data.latency;
    })
//}

async function socketAction(action, data){
    // data = xssFilter(data);
    switch(action)
    {
        case "network-stats-nodes":
            nodes = data;
            _.forEach(nodes, function (node, index) {
            if( _.isUndefined(data.history) )
					{
						data.history = new Array(40);
						_.fill(data.history, -1);
					}
            });
                    if(nodes.length > 0 )
                    {
                    updateActiveNodes(nodes);
                    }
            // for(let i=0; i<nodes.length; i++){
            //     if(typeof nodes[i].stats.hashrate === 'undefined'){
            //         nodes[i].stats.hashrate = 0;
            //     }

            //     nodes[i] = await latencyFilter(nodes[i]);

            //     if(_.isUndefined(nodes.history)){
            //         nodes.history = new Array(40);
            //         _.fill(nodes.history, -1);
            //     }

            //     // Init or recover pin
            //     // nodes[i].pinned = ($scope.pinned.indexOf(node.id) >= 0 ? true : false); //this needs to be implemented with correct syntax
            // }

            // if( nodes.length > 0 )
            // {
            //     // dispatchAction(eventConstants.UPDATE_NODES, nodes);
            //     store.dispatch({type: eventConstants.UPDATE_NODES, data: nodes})
            //     await updateActiveNodes(); //all the commented stuff above needs to be implemented in the correct way for this.
            // }
            break;
        case "add":
            console.log("");
            break;
        case "update":
            console.log("");
            let index = findIndex({id: data.id});

            if( index >= 0 && !_.isUndefined(nodes[index]) && !_.isUndefined(nodes[index].stats) ){
                if( !_.isUndefined(nodes[index].stats.latency) )
                    data.stats.latency = nodes[index].stats.latency;

                if( _.isUndefined(data.stats.hashrate) )
                    data.stats.hashrate = 0;

                if( nodes[index].stats.block.number < data.stats.block.number )
                {
                    let best = _.max(nodes, function (node) {
                        return parseInt(node.stats.block.number);
                    }).stats.block;

                    if (data.stats.block.number > best.number) {
                        data.stats.block.arrived = _.now();
                    } else {
                        data.stats.block.arrived = best.arrived;
                    }

                    nodes[index].history = data.history;

                    nodes[index].stats = data.stats;

                    if( !_.isUndefined(data.stats.latency) && _.get(nodes[index], 'stats.latency', 0) !== data.stats.latency )
                    {
                        nodes[index].stats.latency = data.stats.latency;

                        nodes[index] = await latencyFilter(nodes[index]);
                    }

                    // dispatchAction(eventConstants.UPDATE_NODES, nodes);
                    store.dispatch({type: eventConstants.UPDATE_NODES, data: nodes})

                    await updateBestBlock();
                }
            }
            break;
        case "block":
            let index1 = findIndex({id: data.id});
            if(!_.isEmpty(nodes)){
            if( index1 >= 0 && !_.isUndefined(nodes[index1]) && !_.isUndefined(nodes[index1].stats) )
            {
                if( nodes[index1].stats.block.number < data.block.number )
                {
                    let best = _.max(nodes, function (node) {
                        return parseInt(node.stats.block.number);
                    }).stats.block;

                    if (data.block.number > best.number) {
                        data.block.arrived = _.now();
                    } else {
                        data.block.arrived = best.arrived;
                    }

                    nodes[index1].history = data.history;
                }

                nodes[index1].stats.block = data.block;
                nodes[index1].stats.propagationAvg = data.propagationAvg;
                // dispatchAction(eventConstants.UPDATE_NODES, nodes);
                // store.dispatch({type: eventConstants.UPDATE_NODES, data: nodes})
                 updateBestBlock(nodes);
            }}
            break;
        case "pending":
            let index2 = findIndex({id: data.id});
            if(!_.isEmpty(nodes)){
            if( !_.isUndefined(data.id) && index2 >= 0 )
            {
                let node = nodes[index2];

                if( !_.isUndefined(node) && !_.isUndefined(node.stats.pending) && !_.isUndefined(data.pending) )
                    nodes[index2].stats.pending = data.pending;
            }
        }
            // dispatchAction(eventConstants.UPDATE_NODES, nodes);
            // store.dispatch({type: eventConstants.UPDATE_NODES, data: nodes})

            break;
        case "stats":
            let index3 = findIndex({id: data.id});
            if(!_.isEmpty(nodes)){
            if( !_.isUndefined(data.id) && index3 >= 0 )
            {
                let node = nodes[index3];

                if( !_.isUndefined(node) && !_.isUndefined(node.stats) )
                {
                    nodes[index3].stats.active = data.stats.active;
                    nodes[index3].stats.mining = data.stats.mining;
                    nodes[index3].stats.hashrate = data.stats.hashrate;
                    nodes[index3].stats.peers = data.stats.peers;
                    nodes[index3].stats.gasPrice = data.stats.gasPrice;
                    nodes[index3].stats.uptime = data.stats.uptime;

                    if( !_.isUndefined(data.stats.latency) && _.get(nodes[index3], 'stats.latency', 0) !== data.stats.latency )
                    {
                        nodes[index3].stats.latency = data.stats.latency;

                        nodes[index3] = await latencyFilter(nodes[index3]);
                    }
                     upTime = nodes[index3].stats.uptime;
                    store.dispatch({type: eventConstants.UPDATE_UP_TIME, data: upTime})
                     updateActiveNodes(nodes);
                }
            }
            node = Object.values(nodes[index3]);
            console.log("node", node);
            let tableData = {
                type: node[2].node,
                pendingTxn: node[4].pending,
                lastBlock: node[4].block.number,
                graph: "graph",
                upTime: `${node[4].uptime}%`,
                latency: `${node[4].latency}ms`,
                peers: node[4].peers,
                nodeName: node[2].name,
              };
            console.log("table", tableData);
              if (tableRows.length >= 20) {
                tableRows.pop();
              }
              tableRows.unshift(tableData);
              console.log("length",tableRows);

              store.dispatch({type: eventConstants.UPDATE_NODES_ARR, data: tableRows})
        }
            
            

            break;
        case "info":
            let index4 = findIndex({id: data.id});
            if(!_.isEmpty(nodes)){
            if( index4 >= 0 )
            {
                nodes[index4].info = data.info;

                if( _.isUndefined(nodes[index4].pinned) )
                    nodes[index4].pinned = false;

                // Init latency
                nodes[index4] = await latencyFilter(nodes[index4]);

                // dispatchAction(eventConstants.UPDATE_NODES, nodes);
                // store.dispatch({type: eventConstants.UPDATE_NODES, data: nodes})

                // await updateActiveNodes();
            } }
            break;
        case "blockPropagationChart":
            blockPropagationChart = data.histogram;
            blockPropagationAvg = data.avg;

            break;
        case "uncleCount":
            uncleCount = data[0] + data[1];
            data.reverse();
            uncleCountChart = data;

            break;
        case "charts":
            if( !_.isEqual(avgBlockTime, data.avgBlocktime) )
                avgBlockTime = data.avgBlocktime;
                var avgTime = avgBlockTimeFilter(avgBlockTime)
             store.dispatch({type: eventConstants.UPDATE_AVG_BLOCK, data: avgTime})
            
            if( !_.isEqual(avgTransactionRate, data.avgTransactionRate) )
                avgTransactionRate = data.transactions;
                var value = transactions(avgTransactionRate);
                store.dispatch({type: eventConstants.UPDATE_AVG_RATE, data: value})

            // if( !_.isEqual(avgHashrate, data.avgHashrate) )
            //     avgHashrate = data.avgHashrate;

            // if( !_.isEqual(lastGasLimit, data.gasLimit) && data.gasLimit.length >= 40 )
            //     lastGasLimit = data.gasLimit;

            if( !_.isEqual(lastBlocksTime, data.blocktime) && data.blocktime.length >= MAX_BINS )
                lastBlocksTime = data.blocktime;
                store.dispatch({type: eventConstants.UPDATE_BLOCKTIME, data: lastBlocksTime})

            if( !_.isEqual(difficultyChart, data.difficulty) && data.difficulty.length >= MAX_BINS )
                difficultyChart = data.difficulty;

            // if( !_.isEqual(blockPropagationChart, data.propagation.histogram) ) {
            //     blockPropagationChart = data.propagation.histogram;
            //     blockPropagationAvg = data.propagation.avg;
            // }

            // data.uncleCount.reverse();

            // if( !_.isEqual(uncleCountChart, data.uncleCount) && data.uncleCount.length >= MAX_BINS ) {
            //     uncleCount = data.uncleCount[data.uncleCount.length-2] + data.uncleCount[data.uncleCount.length-1];
            //     uncleCountChart = data.uncleCount;
            // }

            // if( !_.isEqual(transactionDensity, data.transactions) && data.transactions.length >= MAX_BINS )
            //     transactionDensity = data.transactions;

            // if( !_.isEqual(gasSpending, data.gasSpending) && data.gasSpending.length >= MAX_BINS )
            //     gasSpending = data.gasSpending;

            // if( !_.isEqual(miners, data.miners) ) {
            //     miners = data.miners;
            //     await getMinersNames();
            // }

            break;
        case "inactive":
            let index5 = findIndex({id: data.id});

            if( index5 >= 0 )
            {
                if( !_.isUndefined(data.stats) )
                    nodes[index5].stats = data.stats;

                // dispatchAction(eventConstants.UPDATE_NODES, nodes);
                // store.dispatch({type: eventConstants.UPDATE_NODES, data: nodes})

                // await updateActiveNodes();
            }
            break;
        case "latency":
            if( !_.isUndefined(data.id) && !_.isUndefined(data.latency) )
            {
                let index6 = findIndex({id: data.id});

                if( index6 >= 0 )
                {
                    let node = nodes[index6];

                    if( !_.isUndefined(node) && !_.isUndefined(node.stats) && !_.isUndefined(node.stats.latency) && node.stats.latency !== data.latency )
                    {
                        nodes[index6].stats.latency = data.latency;
                        nodes[index6] = await latencyFilter(nodes[index6]);
                    }
                }

                // dispatchAction(eventConstants.UPDATE_NODES, nodes);
                // store.dispatch({type: eventConstants.UPDATE_NODES, data: nodes})
            }

            break;
        case "client-ping":
            // socket.emit('client-pong', {
            //     serverTime: data.serverTime,
            //     clientTime: _.now()
            // });
            break;
    }
}

async function xssFilter(obj){
    if(_.isArray(obj)) {
        return _.map(obj, xssFilter);

    } else if(_.isObject(obj)) {
        return _.mapValues(obj, xssFilter);

    } else if(_.isString(obj)) {
        return obj.replace(/\< *\/* *script *>*/gi,'').replace(/javascript/gi,'');
    } else
        return obj;
}

async function latencyFilter(node)
{
    if(typeof node.readable === 'undefined')
        node.readable = {};

    if( typeof node.stats === 'undefined' ) {
        node.readable.latencyClass = 'text-danger';
        node.readable.latency = 'offline';
    }

    if (node.stats.active === false)
    {
        node.readable.latencyClass = 'text-danger';
        node.readable.latency = 'offline';
    }
    else
    {
        if (node.stats.latency <= 100)
            node.readable.latencyClass = 'text-success';

        if (node.stats.latency > 100 && node.stats.latency <= 1000)
            node.readable.latencyClass = 'text-warning';

        if (node.stats.latency > 1000)
            node.readable.latencyClass = 'text-danger';

        node.readable.latency = node.stats.latency + ' ms';
    }

    return node;
}

function avgBlockTimeFilter(data) {
		if(data < 60)
			return parseFloat(data).toFixed(2);

		return moment.duration(Math.round(data)).humanize();
	
}
function transactions(data){
    if (data === null)
			data = 0;

		var result = 0;
		var unit = '';

		if (data < 10000) {
			result = data;
			unit = '';
		} else if (data < Math.pow(1000, 2)) {
			result = data / 1000;
			unit = 'K';
		} else if (data >= Math.pow(1000, 2)) { // keeping the condition to cover the zero case
			result = data / Math.pow(1000, 2);
			unit = 'M';
		}
        return (result.toFixed(0) +  unit );
}
 function updateActiveNodes(data){
    updateBestBlock(data);

    totalNodes = data.length;
    // dispatchAction(eventConstants.UPDATE_TOTAL_NODES, totalNodes);
    store.dispatch({type: eventConstants.UPDATE_TOTAL_NODES, data: totalNodes})

    nodesActive = _.filter(data, function (node) {
        return node.stats.active === true;
    }).length;
    store.dispatch({type: eventConstants.UPDATE_NODES, data: nodesActive})

    // upTime = _.reduce(nodes, function (total, node) {
    //     return total + node.stats.uptime;
    // }, 0) / nodes.length;
    // // dispatchAction(eventConstants.UPDATE_UP_TIME, upTime);
    // store.dispatch({type: eventConstants.UPDATE_UP_TIME, data: upTime})

    // $scope.map = _.map($scope.nodes, function (node) {
    //     var fill = $filter('bubbleClass')(node.stats, $scope.bestBlock);
    //
    //     if(node.geo != null)
    //         return {
    //             radius: 3,
    //             latitude: node.geo.ll[0],
    //             longitude: node.geo.ll[1],
    //             nodeName: node.info.name,
    //             fillClass: "text-" + fill,
    //             fillKey: fill,
    //         };
    //     else
    //         return {
    //             radius: 0,
    //             latitude: 0,
    //             longitude: 0
    //         };
    // });
}

     function updateBestBlock(data){
    if(data.length){
        let bBlock = _.max(data, function (node)
        {
            return parseInt(node.stats.block.number);
        }).stats.block.number;
        if( bBlock !== bestBlock )
        {
            bestBlock = bBlock;
            store.dispatch({type: eventConstants.UPDATE_BEST_BLOCK, data: bestBlock})

            bestStats = _.max(data, function (node) {
                return parseInt(node.stats.block.number);
            }).stats;

            lastBlock = bestStats.block.arrived;
            let time = timeFilter(lastBlock);
            store.dispatch({type: eventConstants.UPDATE_LAST_BLOCK, data: time})
        }
    }
}

function timeFilter(data){
    var timestamp = data;
        if(timestamp === 0)
            return '∞';
        var time = (new Date()).getTime();
        var diff = Math.floor((time - timestamp)/1000);
        if(diff < 60)
            return Math.round(diff) + 's ago';
        return moment.duration(Math.round(diff), 's').humanize() + ' ago';
}


 function findIndex(search)
{
    return _.findIndex(nodes, search);
}

async function getMinersNames()
{
    if( miners.length > 0 )
    {
        _.forIn(miners, function (value, key)
        {
            if(value.name !== false)
                return;

            if(value.miner === "0x0000000000000000000000000000000000000000")
                return;

            let name = _.result(_.find(_.map(nodes, 'info'), 'coinbase', value.miner), 'name');

            if( !_.isUndefined(name) )
                miners[key].name = name;
        });
    }
}