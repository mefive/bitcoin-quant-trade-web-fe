import { call, put, fork, takeLatest, select } from 'redux-saga/effects';

import * as actionTypes from 'config/actionTypes';
import * as api from 'config/api';
import * as constants from 'config/constants';
import service from 'utils/service';

function* login({ payload }) {
  const {
    name,
    passowrd,
    redirect = constants.PATHNAME_TRADE
  } = payload;

  try {
    const user
      = yield service.get(api.LOGIN, { name, passowrd });

    yield put({
      type: actionTypes.UPDATE_USER,
      payload: user
    });

    yield put({
      type: actionTypes.ROUTE_TO,
      payload: redirect
    });
  }
  catch (e) {
    const { code } = e;

    yield put({
      type: actionTypes.PUSH_MODAL,
      payload: {
        modalType: constants.MODAL_TYPE_LOGIN_ERROR,
        data: code
      }
    });
  }
}

export default function* () {
  yield [
    takeLatest(actionTypes.LOGIN, login)
  ]
}