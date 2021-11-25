import React, { useState, useCallback, useEffect } from 'react';
import { eventConstants } from "../constants";
import store from "../store";
import TableGraph from "../modules/dashboard/tableGraph";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import moment from "moment";
import { batch } from "react-redux";
import { io } from "socket.io-client";

const socket = io("wss://stats1.xinfin.network/primus/?_primuscb=1633499928674-0");


socket.onAny('open', function open() {
  socket.emit('ready');
  console.log('The connection has been opened.');
})


socket.on('open', function open() {
  socket.emit('ready');
  console.log('The connection has been opened.');
})
.on('end', function end() {
  console.log('Socket connection ended.')
})
.on('error', function error(err) {
  console.log(err);
})
.on('reconnecting', function reconnecting(opts) {
  console.log('We are scheduling a reconnect operation', opts);
})
.on('data', function incoming(data) {
 socketAction(data.action, data.data);
});

socket.on('init', function(data)
{
socketAction("init", data.nodes);
});

// const client = new W3CWebSocket(
//   "wss://stats1.xinfin.network/primus/?_primuscb=1633499928674-0"
// );
// client.onopen = (data) => {
//   console.log("onopen", data);
// };
// client.oninit = (data) => {
//   console.log("oninit", data);
// };
// function connection () {
// client.onmessage = async (event) => {
//   var msg = JSON.parse(event.data);
//   socketAction(msg.action, msg.data);
// };
// }
// setInterval(connection(), 1000);




let nodes = [];
let gasPrice = 0;
let upTime = 0;
let test = {};
let updatedRows = [];
let newarray = [];
let datas = [];
let arr = [];
let map = [];
let blockTime = [];
let avgTime = 0;
let bestBlock = [];
let countries = 0;
let lastBlock = [];
let temp = 0;
let mapData = [];
const eth = 325236.15; //Price of one ether per USD today.
const wei = 0.000000000000000001;
let gasUsd = eth*wei;



async function socketAction(action, data) {
  switch (action) {
    case "stats":
      if (data.id in test) {
        return;
      } else {
        test[data.id] = data.stats.active;
        nodes = Object.keys(test).length;
        newarray = Object.keys(test);
        datas = newarray?.filter(
          (element) =>
            element !== "BuzzNjay1(45.77.253.122)" &&
            element !== "FreeWallet-FullNode" &&
            element !== "VoxoV013" &&
            element !== "FreeWallet-FullNode" &&
            element !== "VoxoV012" &&
            element !== "XF" &&
            element !== "AnilChinchawale" &&
            element !== "XDC.BlocksScan.io" &&
            element !== "AtIndSoft" &&
            element !== "XDC.Network" &&
            element !== "xxxddd-Linux-XinFin-Network-One-Click" &&
            element !== "flux-mac-Workstation-Linux-XinFin-Network-One-Click" &&
            element !== "M88NPARTNERSLLC(88.99.191.124)" &&
            element !== "CryptosAndTokens.com" &&
            element !== "CCNode" &&
            element !== "NT-XinFin-Network-One-Click" &&
            element !== "Bella-Linux-XinFin-Network-One-Click" &&
            element !== "rr3016ub20xdc-Linux-XinFin-Network-One-Click"
        );

        arr = [];
        if (datas) {
          datas.map((item) => {
            let ipFilter = item?.split("_")?.reverse()[0];
            function ValidateIPaddress() {
              if (
                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                  ipFilter
                )
              ) {
                return true;
              }
              return false;
            }
            if (ValidateIPaddress()) {
              arr.push(ipFilter);
            }
          });
        }

        map = Array.from(new Set(arr));
      }

      countries = Object.keys(map).length;
      upTime = data.stats.uptime;
      gasPrice = (data.stats.gasPrice)*gasUsd;
      let tableData = {
        type: "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.6",
        pendingTxn: 0,
        lastBlock: "#5567889",
        graph: <TableGraph />,
        upTime: `${data.stats.uptime}%`,
        latency: `${data.stats.latency}ms`,
        peers: data.stats.peers,
        nodeName: data.id,
      };

      if (updatedRows.length >= 20) {
        updatedRows.pop();
      }

      updatedRows.unshift(tableData);

      //   if (map && map.length >= 1) {
      //     (map).map((item) => {
      //     mapData = item;
      //     });}
      //     const [error, res] = await utility.parseResponse(LocationService.getLocation(mapData));
      //     if (error)
      //     return;

      //     let countryData = [{
      //       countries: res.country,
      //       last24h: "64(25.57%)",
      //       last24: "3.56%",
      //       last7: "5.56%",
      //     }];

      //     if (mapData.length >= 9) {
      //       mapData.pop();
      //     }
      //     mapData.unshift(countryData);

      // console.log("data", mapData)
          
          
          

      batch(() => {
      //   store.dispatch({
      //     type: eventConstants.UPDATE_NODES_ARR,
      //     data: updatedRows,
      //   });
      //   store.dispatch({ type: eventConstants.UPDATE_NODES, data: nodes });
        store.dispatch({
          type: eventConstants.UPDATE_GAS_PRICE,
          data: gasPrice,
        });
      //   store.dispatch({ type: eventConstants.UPDATE_UP_TIME, data: upTime });
        // store.dispatch({ type: eventConstants.UPDATE_MAP, data: map });
        
      //   store.dispatch({
      //     type: eventConstants.UPDATE_COUNTRIES,
      //     data: countries,
      //   });
      });

      break;

    case "charts":
      avgTime = data.avgBlocktime.toFixed(3);
      blockTime = data.blocktime;
      // batch(() => {
      //   store.dispatch({
      //     type: eventConstants.UPDATE_AVG_BLOCK,
      //     data: avgTime,
      //   });
      //   store.dispatch({
      //     type: eventConstants.UPDATE_BLOCKTIME,
      //     data: blockTime,
      //   });
      // });

      break;

    case "block":
      let block = data.block.number;
      let time = data.block.arrived;
      if (lastBlock.length >= 2) {
        lastBlock.pop();
      }
      lastBlock.unshift(time);

      if (bestBlock.length >= 2) {
        bestBlock.pop();
      }
      bestBlock.unshift(block);
      if (bestBlock[0] >= bestBlock[1]) temp = bestBlock[0];
      var time1 = moment(lastBlock[0]).format("ss");
      var time2 = moment(lastBlock[1]).format("ss");
      let seconds = time1 - time2;
      // batch(() => {
      //   store.dispatch({
      //     type: eventConstants.UPDATE_BEST_BLOCK,
      //     data: temp,
      //   });

      //   store.dispatch({
      //     type: eventConstants.UPDATE_LAST_BLOCK,
      //     data: seconds,
      //   });
      // });
      break;
  }
}