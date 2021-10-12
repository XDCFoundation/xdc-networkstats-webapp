import React from "react";
import BaseComponent from "../baseComponent";
import DashboardComponent from "./dashboardComponent";
import openSocket from "socket.io-client";
import io from "socket.io-client";
import Utils, {dispatchAction} from "../../utility";
import {connect} from "react-redux";
// import ConnectSocket from "../../services/socket";
import "../../services/socket";
import {eventConstants} from "../../constants";

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
      // ConnectSocket.connectSocket().then(r => {
      //     console.log(r);
      // })
      console.log("start -===========")
      // this.connectToSocket2();

      console.log("end ==--=================")
      this.checkProps();
  }

  checkProps(){
      console.log("this.props.stats ================== ", this.props.stats);
      console.log("this.props.stats.nodes ================== ", this.props.stats.nodes);
      console.log("this.props.stats.totalNodes ================== ", this.props.stats.totalNodes);
      console.log("this.props.stats.bestBlock ================== ", this.props.stats.bestBlock);
      console.log("this.props.stats.lastBlock ================== ", this.props.stats.lastBlock);
      // this.props.dispatchAction(eventConstants.UPDATE_BEST_BLOCK, 7777777777777);
  }


  connectToSocket2(){
      // const socket = io.connect("wss://stats1.xinfin.network/primus/?_primuscb=1633499928674-0");
      const socket = io('wss://stats1.xinfin.network', {
          path: '/primus/',
          transports: ['websocket'],
          query: {_primuscb: '1633499928674-0'},
          reconnection: true
      });
      console.log("testtttststststs");
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

      console.log("dwjyghdbndbnsd");

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
    return <DashboardComponent state={this.state} content={this.props}/>;
  }
}

const mapStateToProps = (state) => {
    return {stats: state.stats}
};

export default connect(mapStateToProps, {dispatchAction})(Dashboard);

