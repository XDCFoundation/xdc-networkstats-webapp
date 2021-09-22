import React from "react";
import BaseComponent from "../baseComponent";
import DashboardComponent from "./dashboardComponent";

class Dashboard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <DashboardComponent state={this.state} />;
  }
}

export default Dashboard;
