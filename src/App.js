/** @format */

import React, { Component } from 'react';
import Login from './container/login.jsx';
import ChatApp from './container/chatApp.jsx';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { get_users } from './store/action';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Login} />
        <Route
          exact
          path='/chat'
          component={ChatApp}
          onEnter={this.props.get_users()}
        />
      </Router>
    );
  }
}

const mapDispatchToProp = (dispatch) => ({
  get_users: () => dispatch(get_users())
});

export default connect(null, mapDispatchToProp)(App);
