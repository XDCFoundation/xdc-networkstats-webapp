import React from "react";
import io from "socket.io-client";
import Utils, { dispatchAction } from "../utility";
import { eventConstants } from "../constants";
import _ from "lodash";
import store from "../store";
import moment from "moment";
import utility from "../utility";
import TableGraph from "../modules/dashboard/tableGraph";
import { NodesService } from "../services/";
import { object } from "underscore";
import sorter from "sort-nested-json";
import { batch } from 'react-redux'

let MAX_BINS = 40;
let nodesArr = [];
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

const socket = io("http://3.88.252.78:3000/", {
  path: "/stats-data/",
  transports: ["websocket"],
  reconnection: true,
});

socket.on("open", function open() {
  socket.emit("ready");
});

socket.on("end", function end() {});

socket.on("error", function error(err) {});

socket.on("reconnecting", function reconnecting(opts) {
  console.log("We are scheduling a reconnect operation", opts);
});

  socket.on("network-stats-data", function node(data) {
    socketAction(data.action, data.data);
  });


socket.on("network-stats-nodes", function node(data) {
  if (!_.isEmpty(data.nodes)) socketAction("network-stats-nodes", data.nodes);
  nodesArr = data.nodes;
});

socket.on("client-latency", function (data) {});

async function socketAction(action, data) {
  switch (action) {
    case "network-stats-nodes":
      nodesArr = data;

      _.forEach(nodesArr, function (node, index) {
        if (_.isUndefined(data.history)) {
          data.history = new Array(40);
          _.fill(data.history, -1);
        }
      });
      if (nodesArr.length > 0) {
        updateActiveNodes(nodesArr);
      }
      break;
    case "add":
      break;
    case "update":
      let index = findIndex({ id: data.id });

      if (
        index >= 0 &&
        !_.isUndefined(nodesArr[index]) &&
        !_.isUndefined(nodesArr[index].stats)
      ) {
        if (!_.isUndefined(nodesArr[index].stats.latency))
          data.stats.latency = nodesArr[index].stats.latency;

        if (_.isUndefined(data.stats.hashrate)) data.stats.hashrate = 0;

        if (nodesArr[index].stats.block.number < data.stats.block.number) {
          let best = _.max(nodesArr, function (node) {
            return parseInt(node.stats.block.number);
          }).stats.block;

          if (data.stats.block.number > best.number) {
            data.stats.block.arrived = _.now();
          } else {
            data.stats.block.arrived = best.arrived;
          }

          nodesArr[index].history = data.history;

          nodesArr[index].stats = data.stats;

          if (
            !_.isUndefined(data.stats.latency) &&
            _.get(nodesArr[index], "stats.latency", 0) !== data.stats.latency
          ) {
            nodesArr[index].stats.latency = data.stats.latency;

            nodesArr[index] = await latencyFilter(nodesArr[index]);
          }

          updateBestBlock(nodesArr);
        }
      }
      break;
    case "block":
      // setInterval(()=>{
let index1 = findIndex({ id: data.id });
      if (!_.isEmpty(nodesArr)) {
        if (
          index1 >= 0 &&
          !_.isUndefined(nodesArr[index1]) &&
          !_.isUndefined(nodesArr[index1].stats)
        ) {
          if (nodesArr[index1].stats.block.number < data.block.number) {
            let best = _.max(nodesArr, function (node) {
              return parseInt(node.stats.block.number);
            }).stats.block;

            if (data.block.number > best.number) {
              data.block.arrived = _.now();
            } else {
              data.block.arrived = best.arrived;
            }

            nodesArr[index1].history = data.history;
          }
          nodesArr[index1].stats.block = data.block;
          nodesArr[index1].stats.propagationAvg = data.propagationAvg;

          updateBestBlock(nodesArr);
        }
      }
      // })
      
      break;
    case "pending":
      let index2 = findIndex({ id: data.id });
      if (!_.isEmpty(nodesArr)) {
        if (!_.isUndefined(data.id) && index2 >= 0) {
          let node = nodesArr[index2];

          if (
            !_.isUndefined(node) &&
            !_.isUndefined(node.stats.pending) &&
            !_.isUndefined(data.pending)
          )
            nodesArr[index2].stats.pending = data.pending;
        }
      }

      break;
    case "stats":
      let index3 = findIndex({ id: data.id });
      if (!_.isEmpty(nodesArr)) {
        if (!_.isUndefined(data.id) && index3 >= 0) {
          let node = nodesArr[index3];

          if (!_.isUndefined(node) && !_.isUndefined(node.stats)) {
            nodesArr[index3].stats.active = data.stats.active;
            nodesArr[index3].stats.mining = data.stats.mining;
            nodesArr[index3].stats.hashrate = data.stats.hashrate;
            nodesArr[index3].stats.peers = data.stats.peers;
            nodesArr[index3].stats.gasPrice = data.stats.gasPrice;
            nodesArr[index3].stats.uptime = data.stats.uptime;

            if (
              !_.isUndefined(data.stats.latency) &&
              _.get(nodesArr[index3], "stats.latency", 0) !== data.stats.latency
            ) {
              nodesArr[index3].stats.latency = data.stats.latency;

              nodesArr[index3] = await latencyFilter(nodesArr[index3]);
            }
            upTime = nodesArr[index3].stats.uptime;
            store.dispatch({
              type: eventConstants.UPDATE_UP_TIME,
              data: upTime,
            });
            updateActiveNodes(nodesArr);
          }
        }
      }

      break;
    case "info":
      let index4 = findIndex({ id: data.id });
      if (!_.isEmpty(nodesArr)) {
        if (index4 >= 0) {
          nodesArr[index4].info = data.info;

          if (_.isUndefined(nodesArr[index4].pinned))
            nodesArr[index4].pinned = false;

          nodesArr[index4] = await latencyFilter(nodesArr[index4]);
        }
      }
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
      if (!_.isEqual(avgBlockTime, data.avgBlocktime))
        avgBlockTime = data.avgBlocktime;
      var avgTime = avgBlockTimeFilter(avgBlockTime);
       

      if (!_.isEqual(avgTransactionRate, data.avgTransactionRate))
        avgTransactionRate = data.transactions;
      var value = transactions(avgTransactionRate);
      

      if (
        !_.isEqual(lastBlocksTime, data.blocktime) &&
        data.blocktime.length >= MAX_BINS
      )
        lastBlocksTime = data.blocktime;
      
      batch(() => {
        store.dispatch({type: eventConstants.UPDATE_AVG_BLOCK, data: avgTime})
        store.dispatch({type: eventConstants.UPDATE_AVG_RATE, data: value})
        store.dispatch({type: eventConstants.UPDATE_BLOCKTIME, data: lastBlocksTime}) 
      })
      if (
        !_.isEqual(difficultyChart, data.difficulty) &&
        data.difficulty.length >= MAX_BINS
      )
        difficultyChart = data.difficulty;

      break;
    case "inactive":
      let index5 = findIndex({ id: data.id });

      if (index5 >= 0) {
        if (!_.isUndefined(data.stats)) nodesArr[index5].stats = data.stats;
      }
      break;
    case "latency":
      if (!_.isUndefined(data.id) && !_.isUndefined(data.latency)) {
        let index6 = findIndex({ id: data.id });

        if (index6 >= 0) {
          let node = nodesArr[index6];

          if (
            !_.isUndefined(node) &&
            !_.isUndefined(node.stats) &&
            !_.isUndefined(node.stats.latency) &&
            node.stats.latency !== data.latency
          ) {
            nodesArr[index6].stats.latency = data.latency;
            nodesArr[index6] = await latencyFilter(nodesArr);
          }
        }
      }

      break;
    case "client-ping":
      break;
  }
}

async function latencyFilter(node) {
  if (typeof node.readable === "undefined") node.readable = {};

  if (typeof node.stats === "undefined") {
    node.readable.latencyClass = "text-danger";
    node.readable.latency = "offline";
  }

  if (node.stats.active === false) {
    node.readable.latencyClass = "text-danger";
    node.readable.latency = "offline";
  } else {
    if (node.stats.latency <= 100) node.readable.latencyClass = "text-success";

    if (node.stats.latency > 100 && node.stats.latency <= 1000)
      node.readable.latencyClass = "text-warning";

    if (node.stats.latency > 1000) node.readable.latencyClass = "text-danger";

    node.readable.latency = node.stats.latency + " ms";
  }

  return node;
}

function avgBlockTimeFilter(data) {
  if (data < 60) return parseFloat(data).toFixed(2);

  return moment.duration(Math.round(data)).humanize();
}
function transactions(data) {
  if (data === null) data = 0;

  var result = 0;
  var unit = "";

  if (data < 10000) {
    result = data;
    unit = "";
  } else if (data < Math.pow(1000, 2)) {
    result = data / 1000;
    unit = "K";
  } else if (data >= Math.pow(1000, 2)) {
    // keeping the condition to cover the zero case
    result = data / Math.pow(1000, 2);
    unit = "M";
  }
  return parseInt(result).toFixed(0) + unit;
}
function updateActiveNodes(data) {
  updateBestBlock(data);
  let marker = [];
  let country = [];
  let count = 0;
  let temp = Array();

  totalNodes = data.length;

  nodesActive = _.filter(data, function (node) {
    return node.stats.active === true;
  }).length;
  

  _.forEach(nodesArr, function (node, index) {
    marker.push({
      coords: node.geo.ll,
    });
    country.push({
      loc: node.geo.country,
    });
  });

  for (let i = 0; i < nodesArr.length; ++i) {
    temp[country[i].loc] = 1;
  }
  let hs = {};
  let countryArray = [];
  for (let i = 0; i < country.length; i++) {
    if (hs.hasOwnProperty(country[i].loc)) {
      hs[country[i].loc] = hs[country[i].loc] + 1;
    } else {
      hs[country[i].loc] = 1;
    }
  }
  for (const [key, value] of Object.entries(hs)) {
    countryArray.push({
      country: key,
      count: value,
    });
  }
  countryArray = sorter.sort(countryArray).desc("count");
  count = Object.keys(temp).length;
  batch(() => {
  store.dispatch({type: eventConstants.UPDATE_EXPANDEDCOUNTRY, data: countryArray})
  store.dispatch({type: eventConstants.UPDATE_COUNTRIES, data: count})
  store.dispatch({type: eventConstants.UPDATE_MARKERS, data: marker})
  store.dispatch({type: eventConstants.UPDATE_NODES, data: nodesActive})
  store.dispatch({type: eventConstants.UPDATE_TOTAL_NODES, data: totalNodes})
  })
}

function updateBestBlock(data) {
  const wei = 0.000000000000000001;
  if (data.length) {
    let bBlock = _.maxBy(data, function (node) {
      return parseInt(node.stats.block.number);
    }).stats.block.number;
    if (bBlock !== bestBlock) {
      bestBlock = bBlock;

      bestStats = _.maxBy(data, function (node) {
        return parseInt(node.stats.block.number);
      }).stats;

      lastBlock = bestStats.block.arrived;
      let GasInit = bestStats.gasPrice;
      let time = timeFilter(lastBlock);
      async function fetchData() {
        const [error, res] = await utility.parseResponse(
          NodesService.getGasPrice()
        );
        if (!_.isUndefined(res.responseData[0])) {
          let price = res.responseData[0].gasPrice.data.ETH.quote.USD.price;
          let convertedPrice = price * wei;
          gasPrice = convertedPrice * GasInit;
        }
      }
      fetchData();
      batch(() => {
      store.dispatch({type: eventConstants.UPDATE_GAS_PRICE, data: gasPrice.toFixed(6)})
      store.dispatch({type: eventConstants.UPDATE_LAST_BLOCK, data: time})
      store.dispatch({type: eventConstants.UPDATE_BEST_BLOCK, data: bestBlock})
      })
    }
  }
}

function timeFilter(data) {
  var timestamp = data;
  if (timestamp === 0) return "∞";
  var time = new Date().getTime();
  var diff = Math.floor((time - timestamp) / 1000);
  if (diff < 60) return Math.round(diff) + "s ago";
  return moment.duration(Math.round(diff), "s").humanize() + " ago";
}

function findIndex(search) {
  return _.findIndex(nodesArr, search);
}
setInterval(() => {
  let table = [];
  for (let i = 0; i < nodesArr.length; i++) {
    table.push({
      type: nodesArr[i].info.node,
      pendingTxn: nodesArr[i].stats.pending,
      lastBlock: nodesArr[i].stats.block.number,
      // graph: <TableGraph content={nodesArr[i].history} />,
      upTime: `${nodesArr[i].stats.uptime}%`,
      latency: `${nodesArr[i].stats.latency}ms`,
      peers: nodesArr[i].stats.peers,
      nodeName: nodesArr[i].info.name,
    });
  }
  store.dispatch({ type: eventConstants.UPDATE_NODES_ARR, data: table });
}, 1500);
