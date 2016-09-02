import { all, fork } from 'redux-saga/effects';

import app from './app';
import posts from './posts';
import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(app), fork(posts), fork(user)]);
}
