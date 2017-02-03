import { handleActions } from 'redux-actions';

import * as actionTypes from 'config/actionTypes';
import { toNumber } from 'utils/object';

const initialState = {
  buy: 0,
  high: 0,
  last: 0,
  low: 0,
  sell: 0,
  vol: 0
}

export default handleActions({
  [actionTypes.UPDATE_TICKER]: (state, { payload }) => 
    ({ ...state, ...toNumber(payload) })
}, initialState);
