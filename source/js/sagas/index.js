import { fork } from 'redux-saga/effects';

import error from './error';
import user from './user';

export default function* root() {
  yield [
    fork(error),
    fork(user)
  ];
}
