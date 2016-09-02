// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { getPosts } = createActions({
  [ActionTypes.GET_POSTS]: query => ({ query }),
});

export const { saveEntry } = createActions({
  [ActionTypes.SAVE_ENTRY]: entry => entry,
});
