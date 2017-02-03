import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'styles/base.scss';

class App extends Component {
  render() {
    return (
      <div id="app">
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    user
  };
}

export default connect(mapStateToProps)(App);
