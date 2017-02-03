import { call, put, fork, takeLatest, select } from 'redux-saga/effects';

import service from 'utils/service';
import { toNumber } from 'utils/object';
import * as actionTypes from 'config/actionTypes';
import * as api from 'config/api';

function* fetchData() {
  try {
    const data = yield service.get(api.USER_INFO);

    yield put({
      type: actionTypes.UPDATE_USER,
      payload: data
    });
  }
  catch (e) {
    yield put({
      type: actionTypes.FETCH_ERROR,
      payload: e
    });
  }
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_USER, fetchData);
}
