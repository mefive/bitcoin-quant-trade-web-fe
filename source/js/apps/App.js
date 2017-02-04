import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as actionTypes from 'config/actionTypes';
import * as constants from 'config/constants';
import * as api from 'config/api';
import service from 'utils/service';

import Alert from 'components/Alert';

import 'styles/base.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.checkAuth(this.props.location.pathname);

    this.state = {
      active: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { routeTo, location: { pathname } } = nextProps;

    if (this.props.location.pathname !== pathname) {
      if ([
        constants.PATHNAME_LOGIN,
        constants.PATHNAME_TRADE
      ].indexOf(pathname) !== -1) {
        this.setState({ active: false });
        this.checkAuth(pathname);
      }
    }

    if (routeTo !== this.props.routeTo) {
      if (routeTo && routeTo !== this.props.location.pathname) {
        this.props.router.push(routeTo);
      }
    }
  }

  async checkAuth(pathname) {
    const { router, user: { uid }, dispatch } = this.props;

    if (uid) {
      this.handleHasUser(pathname);

      return;
    }

    try {
      const data = await service.get(api.CURRENT_USER);

      this.handleHasUser(pathname);

      dispatch({
        type: actionTypes.UPDATE_USER,
        payload: data
      });
    }
    catch(e) {
      if (pathname !== constants.PATHNAME_LOGIN) {
        router.push(constants.PATHNAME_LOGIN);
      }
      else {
        this.setState({ active: true });
      }
    }
  }

  handleHasUser(pathname) {
    if (pathname === constants.PATHNAME_LOGIN) {
      this.props.router.push(constants.PATHNAME_TRADE);
    }
    else {
      this.setState({ active: true });
    }
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
      <div
        id="app"
        className={classNames(
          { 'hidden': !this.state.active }
        )}
      >
        {this.props.children}

        {this.getAlert()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  const { current: modal } = state.modal;
  const { routeTo } = state.status;

  return {
    user,
    modal,
    routeTo
  };
}

export default connect(mapStateToProps)(App);
