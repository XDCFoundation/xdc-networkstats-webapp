import React from 'react';
import {Router, Route} from 'react-router-dom';
import {Redirect, Switch} from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from "react-redux";
import {Dashboard} from "./modules";
import {history} from "./managers/history";
import BaseComponent from "./modules/baseComponent";

class Routes extends BaseComponent {

    componentDidMount() {

    }

    render() {
        return (

            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Router history={history}>
                    <Switch>
                        <Route exact path={'/'} component={Dashboard}/>
                        <Redirect exact from='*' to="/"/>
                    </Switch>
                </Router>
            </MuiThemeProvider>);
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
};
export default connect(mapStateToProps)(Routes);