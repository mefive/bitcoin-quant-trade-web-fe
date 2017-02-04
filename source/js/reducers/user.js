import { handleActions } from 'redux-actions';
import pick from 'lodash/pick';

import * as actionTypes from 'config/actionTypes';
import { toNumber } from 'utils/object';

const initialState = {
  name: '',
  uid: 0,
  simulate: false,
  asset: {
    net: 0,
    total: 0
  },
  free: {
    btc: 0,
    cny: 0,
    ltc: 0
  },
  freezed: {
    btc: 0,
    cny: 0,
    ltc: 0
  }
}

export default handleActions({
  [actionTypes.UPDATE_USER]: (state, { payload }) =>
    ({ ...state, ...pick(payload, ['name', 'uid', 'simulate']) }),

  [actionTypes.UPDATE_USER_INFO]: (state, { payload }) => {
    return {
      ...state,
      asset: toNumber(payload.asset),
      free: toNumber(payload.free),
      freezed: toNumber(payload.freezed)
    };
  }
}, initialState);
