import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}
