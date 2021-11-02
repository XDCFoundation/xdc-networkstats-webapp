import io from "socket.io-client";
import React from "react";
import { eventConstants } from "../constants";
import store from "../store";
import TableGraph from "../modules/dashboard/tableGraph";
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket(
  "wss://stats1.xinfin.network/primus/?_primuscb=1633499928674-0"
);
client.onopen = (data) => {
  console.log("onopen", data);
};
client.oninit = (data) => {
  console.log("oninit", data);
};
client.onmessage = async (event) => {
  var msg = JSON.parse(event.data);
  socketAction(msg.action, msg.data);
};

let nodes = [];
let gasPrice = 0;
let upTime = 0;
let test = {};
let updatedRows = [];
let newarray = [];
let datas = [];
let arr = [];
let map = [];

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
      upTime = data.stats.uptime;
      gasPrice = data.stats.gasPrice;
      updatedRows.push({
        type: "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.6",
        pendingTxn: 0,
        lastBlock: "#5567889",
        graph: <TableGraph />,
        upTime: data.stats.uptime,
        latency: `${data.stats.latency}ms`,
        peers: data.stats.peers,
        nodeName: data.id,
      });
      store.dispatch({
        type: eventConstants.UPDATE_NODES_ARR,
        data: updatedRows,
      });
      store.dispatch({ type: eventConstants.UPDATE_NODES, data: nodes });
      store.dispatch({ type: eventConstants.UPDATE_GAS_PRICE, data: gasPrice });
      store.dispatch({ type: eventConstants.UPDATE_UP_TIME, data: upTime });
      store.dispatch({ type: eventConstants.UPDATE_MAP, data: map });

      break;
    }}

