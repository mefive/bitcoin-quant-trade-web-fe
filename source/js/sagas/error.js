import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from 'config/actionTypes';
import * as constants from 'config/constants';

export const globalErrors = {
  400: '请求格式不正确',
  403: '没有权限',
  404: '资源未找到',
  406: 'NOT_ACCEPT',
  500: '服务器内部错误',
  501: '未实现该功能'
};

function getErrorMessage({ code, message, url, method }) {
  const serverMessage = message;

  if (!method) {
    method = 'GET';
  }

  const globalError = globalErrors[code];

  if (globalError) {
    message = globalError;
  }

  return {
    method: method.toUpperCase(),
    url,
    message
  };
}

function* handleError({ payload }) {
  const error = getErrorMessage(payload);

  yield put({
    type: actionTypes.PUSH_MODAL,
    payload: {
      modalType: constants.MODAL_TYPE_ERROR,
      data: error
    }
  });
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_ERROR, handleError);
}
