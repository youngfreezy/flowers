import reducer from 'reducers/posts';
import { ActionTypes } from 'constants/index';

describe('PostsGrid', () => {
  it('should return the initial state', () => {
    expect(reducer.posts(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.GET_POSTS}`, () => {
    expect(
      reducer.posts(undefined, {
        type: ActionTypes.GET_POSTS,
        payload: { q: 'react' },
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.GET_POSTS_SUCCESS}`, () => {
    expect(
      reducer.posts(undefined, {
        type: ActionTypes.GET_POSTS_SUCCESS,
        payload: {},
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.GET_POSTS_FAILURE}`, () => {
    expect(
      reducer.posts(undefined, {
        type: ActionTypes.GET_POSTS_FAILURE,
        payload: {},
      }),
    ).toMatchSnapshot();
  });
});
