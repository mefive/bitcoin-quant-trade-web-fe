import { combineReducers } from 'redux';

import user from './user';
import ticker from './ticker';

export default combineReducers({
  user,
  ticker
});
