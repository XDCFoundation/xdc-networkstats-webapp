import React from 'react';
import {Router, Route} from 'react-router-dom';
import {Redirect, Switch} from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from "react-redux";
import {Dashboard} from "./modules";
import {history} from "./managers/history";
import BaseComponent from "./modules/baseComponent";
import { io } from "socket.io-client";

class Routes extends BaseComponent {
  Socket = io("http://3.88.252.78:3000/", {
    path: "/stats-data/",
    transports: ["websocket"],
    reconnection: true,
  });

  componentDidMount() {}

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path={"/"}
              component={() => <Dashboard socket={this.Socket} />}
            />
            <Redirect exact from="*" to="/" />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
    return {user: state.user}
};
export default connect(mapStateToProps)(Routes);