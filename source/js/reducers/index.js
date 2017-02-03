import { combineReducers } from 'redux';

import user from './user';
import ticker from './ticker';
import modal from './modal';

export default combineReducers({
  user,
  ticker,
  modal
});
