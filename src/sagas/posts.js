/*eslint-disable no-console */

/**
 * @module Sagas/Posts
 * @desc Posts
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';

import { ActionTypes } from 'constants/index';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getPosts() {
  try {
    const response = yield call(request, '/api/posts');
    yield put({
      type: ActionTypes.GET_POSTS_SUCCESS,
      payload: { items: response.items },
    });
  } catch (err) {
    console.log(err, 'THE ERROR');
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_POSTS_FAILURE,
      payload: err,
    });
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GET_POSTS, getPosts)]);
}
