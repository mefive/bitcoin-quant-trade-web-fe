import { handleActions } from 'redux-actions';

import * as actionTypes from 'config/actionTypes';

const initialState = {
  routeTo: null,
  pathname: ''
};

export default handleActions({
  [actionTypes.ROUTE_TO]: (state, { payload }) =>
    ({ ...state, routeTo: payload })
}, initialState);
