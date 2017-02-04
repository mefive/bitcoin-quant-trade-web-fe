import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Dashboard from './Dashboard';
import * as actionTypes from 'config/actionTypes';

class Trade extends Component {
  componentDidMount() {
    const { user: { uid } } = this.props;

    if (uid) {
      this.openSocket(uid);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user: { uid } } = nextProps;

    if (uid !== this.props.user.uid) {
      if (uid) {
        this.openSocket(uid);
      }
    }
  }

  componentWillUnmount() {
    this.closeSocket();
  }

  openSocket(uid) {
    this.closeSocket();

    const socket
    = this.socket
    = io(
      'http://localhost:3000',
      {
        query: { uid }
      }
    );

    socket
      .on('connect', () => {
        console.log('connect client');
      });

    socket
      .on('ticker', data => {
        const { ticker, user } = data;

        this.props.dispatch({
          type: actionTypes.UPDATE_TICKER,
          payload: ticker
        });

        this.props.dispatch({
          type: actionTypes.UPDATE_USER_INFO,
          payload: user
        });
      });
  }

  closeSocket() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  render() {
    const { user, ticker } = this.props;

    return (
      <div id="trade">
        <Dashboard
          user={user}
          ticker={ticker}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user, ticker } = state;

  return {
    user,
    ticker
  };
}

export default connect(mapStateToProps)(Trade);
