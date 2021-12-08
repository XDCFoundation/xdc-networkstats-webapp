import React from "react";
import BaseComponent from "../baseComponent";
import DashboardComponent from "./dashboardComponent";
import openSocket from "socket.io-client";
import io from "socket.io-client";
import Utils, { dispatchAction } from "../../utility";
import { connect } from "react-redux";
// import ConnectSocket from "../../services/socket";
import "../../services/socket";
import { eventConstants } from "../../constants";

class Dashboard extends BaseComponent {
  nodes = 10;
  test = {};

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
      upTime: 99,
    };

    
    // ConnectSocket.connectSocket().then(r => {
    //     console.log(r);
    // })
    console.log("start -===========");
    this.connectToSocket2();

    console.log("end ==--=================");
    this.connection();
  }

  connection() {
    console.log("this.props.stats ================== ", this.props.stats);
    console.log(
      "this.props.stats.nodes ================== ",
      this.props.stats.nodes
    );
    console.log(
      "this.props.stats.totalNodes ================== ",
      this.props.stats.totalNodes
    );
    console.log(
      "this.props.stats.bestBlock ================== ",
      this.props.stats.bestBlock
    );
    console.log(
      "this.props.stats.lastBlock ================== ",
      this.props.stats.lastBlock
    );
  }
  socketAction = (action, data) => {
    switch (action) {
      case "stats":
        if (data.id in test) {
          return;
        } else {
          this.test[data.id] = data.stats.active;
          this.nodes = Object.keys(test).length;
          console.log(this.nodes,".///////////////");
        }}
  }

  connectToSocket2() {
    const Socket = io("http://3.88.252.78:3000/", {
    path: "/stats-data/",
    transports: ["websocket"],
    reconnection: true,
     });
    Socket.on("open", function open() {
      Socket.emit("ready");
      console.log("The connection has been opened.");
    });
    // Socket.on("network-stats-nodes", function nodes(data, err) {
    //   console.log("Nodes RECEIVED !!!!!!", data);
    // });
    Socket.on("network-stats-data", function nodes(data, err) {
      console.log("DATA RECEIVED !!!!!!", err, data);
      // this.socketAction(data.action, data.data);
      this.props.dispatchAction(eventConstants.UPDATE_NODES, data=this.nodes )
    });
  }
 

  componentDidMount() {}

  render() {
    return <DashboardComponent state={this.state} content={this.props} />;
  }
}

const mapStateToProps = (state) => {
  return { stats: state.stats };
};

export default connect(mapStateToProps, { dispatchAction })(Dashboard);
