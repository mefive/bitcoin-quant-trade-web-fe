import { combineReducers } from 'redux';

import user from './user';
import ticker from './ticker';
import modal from './modal';
import status from './status';

export default combineReducers({
  user,
  ticker,
  modal,
  status
});
