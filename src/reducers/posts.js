/* eslint-disable no-console */
import { parseError } from 'modules/client';
import { handleActions } from 'modules/helpers';
import sortBy from 'lodash/sortBy';
import { ActionTypes, STATUS } from 'constants/index';

export const postsState = {
  items: [],
  status: STATUS.IDLE,
};

export default {
  posts: handleActions(
    {
      [ActionTypes.GET_POSTS]: (draft, { payload }) => {
        console.log(draft);
        console.log(payload);
        console.log('THE PAYLOAD FROM GET REQUEST');
      },
      [ActionTypes.GET_POSTS_SUCCESS]: (draft, { payload }) => {
        draft.items = payload.items || [];
        draft.status = STATUS.SUCCESS;
      },
      [ActionTypes.GET_POSTS_FAILURE]: (draft, { payload }) => {
        draft.items = parseError(payload.message);
        draft.status = STATUS.ERROR;
      },
      [ActionTypes.SAVE_ENTRY]: (draft, { payload }) => {
        const newItems = sortBy(
          draft.items.filter(item => item.id !== payload.id).concat(payload),
          'id',
        );
        draft.items = newItems;
      },
    },
    postsState,
  ),
};
