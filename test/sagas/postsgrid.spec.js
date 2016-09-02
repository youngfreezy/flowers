import { expectSaga } from 'redux-saga-test-plan';

import posts, { getPosts } from 'sagas/posts';
import { ActionTypes } from 'constants/index';

jest.mock('modules/client', () => ({
  request: () => ({ items: [] }),
}));

describe('posts', () => {
  it('should have the expected watchers', done =>
    expectSaga(posts)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      }));

  it('should have the posts saga', () =>
    expectSaga(getPosts)
      .put({
        type: ActionTypes.GET_POSTS_SUCCESS,
        payload: {
          items: [],
        },
      })
      .run());
});
