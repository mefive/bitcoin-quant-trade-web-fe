import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import pick from 'lodash/pick';

import * as actionTypes from 'config/actionTypes';
import * as api from 'config/api';
import * as constants from 'config/constants';
import service from 'utils/service';

function* register({ payload }) {
  try {
    const user
      = yield service.post(api.USER, pick(payload, [
        'name', 'password', 'apiKey', 'secretKey', 'simulate'
      ]));

    yield put({
      type: actionTypes.PUSH_MODAL,
      payload: {
        modalType: constants.MODAL_TYPE_REGISTER_SUCC
      }
    });
  }
  catch (e) {
    const { code } = e;

    let error;

    if (code === 1002) {
      error = '该用户已存在';
    }
    else if (code === 1001) {
      error = 'apiKey 或 secretKey 不正确';
    }

    if (error) {
      yield put({
        type: actionTypes.PUSH_MODAL,
        payload: {
          modalType: constants.MODAL_TYPE_ERROR,
          data: error
        }
      });
    }
    else {
      yield put({
        type: actionTypes.FETCH_ERROR,
        payload: e
      });
    }
  }
}

export default function* () {
  yield [
    takeLatest(actionTypes.REGISTER, register)
  ];
}
