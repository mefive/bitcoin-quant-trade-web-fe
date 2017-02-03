import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';

class Trade extends Component {
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
