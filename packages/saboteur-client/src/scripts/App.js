import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import authenticationService from "./services/authentication";
import wsService from "./services/ws";
import "../styles/variables.css";
import "../../node_modules/reset-css/reset.css";
import "../styles/App.css";

import PrivateRoute from "./components/PrivateRoute";
import HomeContainer from "./containers/Home";
import LoginContainer from "./containers/Login";
import GameContainer from "./containers/Game";
import GameCreationContainer from "./containers/GameCreation";

class App extends Component {
  constructor(props) {
    super(props);

    this.props.history.listen((location, action) => {
      this.checkLogin();
    });
  }

  state = {
    wsConnected: false
  };

  checkLogin() {
    if (!authenticationService.isAuthenticated() || this.state.wsConnected) {
      return;
    }
    wsService
      .connect(authenticationService.getToken())
      .then(({ user, ws }) => {
        this.setState({
          wsConnected: true,
          user,
          ws
        });
      })
      .catch(reachedServer => {
        if (reachedServer) {
          this.props.history.push("/Login");
        }
      });
  }

  componentWillMount() {
    this.checkLogin();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <PrivateRoute
            path="/games/:id"
            wsConnected={this.state.wsConnected}
            ws={this.state.ws}
            user={this.state.user}
            Component={GameContainer}
          />
          <PrivateRoute
            path="/game-creation"
            wsConnected={this.state.wsConnected}
            user={this.state.user}
            Component={GameCreationContainer}
          />
          <Route path="/login" component={LoginContainer} />
          <PrivateRoute
            exact
            path="/"
            wsConnected={this.state.wsConnected}
            ws={this.state.ws}
            user={this.state.user}
            Component={HomeContainer}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
