import { handleActions } from 'redux-actions';

import * as actionTypes from 'config/actionTypes';
import { toNumber } from 'utils/object';

const initialState = {
  name: '',
  uid: 0,
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
  [actionTypes.UPDATE_USER]: (state, { payload }) => {
    return {
      ...state,
      asset: toNumber(payload.asset),
      free: toNumber(payload.free),
      freezed: toNumber(payload.freezed)
    };
  }
}, initialState);
