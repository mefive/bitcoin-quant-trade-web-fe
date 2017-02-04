import { handleActions } from 'redux-actions';

import * as actionTypes from 'config/actionTypes';

const initialState = {
  user: {
    name: '',
    uid: '',
    apiKey: '',
    secretKey: '',
    simulate: false
  }
};

export default handleActions({
  [actionTypes.UPDATE_LOGIN_USER]: (state, { payload }) =>
    ({ ...state, user: { ...payload } })
}, initialState);
