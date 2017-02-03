import React, { Component } from 'react';
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

import App from './App';
import Trade from './trade';
import Login from './Login';

const store = createStore({});

ReactDOM.render(
  (<Provider store={store}>
    <Router
      history={hashHistory}
      render={applyRouterMiddleware(useScroll())}
    >
      <Route path="/" component={App}>
        <IndexRedirect to="trade" />
        <Route path="trade" component={Trade} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>),
  document.getElementById('main')
);

// import io from 'socket.io-client';

// const socket = io(
//   'http://localhost:3000',
//   {
//     query: {
//       uid: '5891c12ad87499d66b40712d'
//     }
//   }
// );

// socket
//   .on('connect', () => {
//     console.log('connect client');
//   });

// socket
//   .on('ticker', data => {
//     const { ticker, user } = data;

//     store.dispatch({
//       type: actionTypes.UPDATE_TICKER,
//       payload: ticker
//     });

//     store.dispatch({
//       type: actionTypes.UPDATE_USER,
//       payload: user
//     });
//   });
