import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import pick from 'lodash/pick';

import * as actionTypes from 'config/actionTypes';
import * as api from 'config/api';
import * as constants from 'config/constants';
import service from 'utils/service';

function* fetchData({ payload }) {
  const { name } = payload;

  let user;

  try {
    user = yield service.get(api.USER, { name });
  }
  catch (e) {
    yield put({
      type: actionTypes.PUSH_MODAL,
      payload: {
        modalType: constants.MODAL_TYPE_ERROR,
        data: '没有该用户'
      }
    });
  }

  yield put({
    type: actionTypes.UPDATE_LOGIN_USER,
    payload: user
  });
}

function* login({ payload }) {
  let { redirect, user } = payload;

  if (!redirect) {
    redirect = constants.PATHNAME_TRADE;
  }

  try {
    user = yield service.get(
      api.LOGIN,
      { ...pick(user, ['name', 'apiKey', 'secretKey']) }
    );
  }
  catch (e) {
    yield put({
      type: actionTypes.FETCH_ERROR,
      payload: e
    });
  }

  yield put({
    type: actionTypes.UPDATE_USER,
    payload: user
  });

  yield put({
    type: actionTypes.ROUTE_TO,
    payload: redirect
  });
}

export default function* () {
  return yield [
    takeLatest(actionTypes.FETCH_LOGIN_USER, fetchData),
    takeLatest(actionTypes.LOGIN, login)
  ];
}