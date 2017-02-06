/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  applyRouterMiddleware,
  Router,
  Route,
  IndexRedirect,
  hashHistory
} from 'react-router';
import { useScroll } from 'react-router-scroll';
import { Provider } from 'react-redux';
import Fastclick from 'fastclick';

import createStore from 'createStore';
import * as actionTypes from 'config/actionTypes';
import * as constants from 'config/constants';

import App from './App';
import Trade from './trade';
import Login from './Login';
import Register from './Register';

const store = createStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={hashHistory}
      render={applyRouterMiddleware(useScroll())}
    >
      <Route path="/" component={App}>
        <IndexRedirect to="trade" />
        <Route path="trade" component={Trade} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
