import { fork } from 'redux-saga/effects';

import error from './error';
import user from './user';
import login from './login';

export default function* root() {
  yield [
    fork(error),
    fork(user),
    fork(login)
  ];
}
