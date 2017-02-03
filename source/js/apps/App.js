import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from 'config/actionTypes';
import * as constants from 'config/constants';

import Alert from 'components/Alert';

import 'styles/base.scss';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: actionTypes.FETCH_USER
    });
  }

  getAlert() {
    const { modal } = this.props;

    let error = null;

    if (modal
      && modal.modalType === constants.MODAL_TYPE_ERROR
    ) {
      error = modal.data;
    }

    return (
      <Alert
        onClose={() => this.props.dispatch({
          type: actionTypes.POP_MODAL
        })}
        visible={!!error}
      >
        {error && (
          <span>
            <strong>{error.method}</strong>{`  ${error.url}`}
            <br />
            {error.message}
          </span>
        )}
      </Alert>
    )
  }

  render() {
    return (
      <div id="app">
        {this.props.children}

        {this.getAlert()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  const { current: modal } = state.modal;

  return {
    user,
    modal
  };
}

export default connect(mapStateToProps)(App);
