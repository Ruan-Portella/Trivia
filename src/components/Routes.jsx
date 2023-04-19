import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Settings from '../pages/Settings';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/game" component={ Game } /> */}
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}
