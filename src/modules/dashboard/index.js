import React from "react";
import BaseComponent from "../baseComponent";
import DashboardComponent from "./dashboardComponent";
import openSocket from "socket.io-client";
import io from "socket.io-client";
import Utils, {dispatchAction} from "../../utility";
import {connect} from "react-redux";
import ConnectSocket from "../../services/socket";

class Dashboard extends BaseComponent {
  constructor(props) {
      super(props);
      this.state = {
          nodes: 192,
          totalNodes: 196,
          countries: 60,
          bestBlock: 55963,
          avgTime: 0.1,
          lastBlock: 15,
          gasPrice: 0.002,
          avgRate: 98,
          upTime: 99

      };
      ConnectSocket.connectSocket().then(r => {
          console.log(r);
      })
      // this.connectToSocket();
  }


  connectToSocket(){
      const socket = io.connect("wss://stats1.xinfin.network/primus/?_primuscb=1633499928674-0");
      // const socket = openSocket("wss://stats1.xinfin.network/primus/?_primuscb=1633499928674-0");
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
              console.log("data.action =========", data.action);
              console.log("data.data =========", data.data);
              // $scope.$apply(socketAction(data.action, data.data));
          });

      socket.on('init', function(data)
      {
          // $scope.$apply(socketAction("init", data.nodes));
      });

      socket.on('client-latency', function(data)
      {
          // $scope.latency = data.latency;
      })
  }

  componentDidMount() {}

  render() {
    return <DashboardComponent state={this.state} />;
  }
}

const mapStateToProps = (state) => {
    return {stats: state.stats}
};

export default connect(mapStateToProps, {dispatchAction})(Dashboard);

