import React from 'react';

import { STATUS } from 'constants/index';

import { PostsGrid } from 'components/PostsGrid';

jest.mock('nanoid', () => () => 'ABCDE');

const mockDispatch = jest.fn();
const props = {
  dispatch: mockDispatch,
  posts: {
    items: [],
  },
};

function setup(ownProps = props) {
  return shallow(<PostsGrid {...ownProps} />, { attachTo: document.getElementById('react') });
}

describe('PostsGrid', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a Loader without data', () => {
    expect(wrapper.find('Loader')).toExist();
  });

  it('should have dispatched an action on mount', () => {
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {},
      type: 'GET_POSTS',
    });
  });

  it("should not render if selected data doesn't exist", () => {
    wrapper.setProps({
      posts: {
        status: STATUS.SUCCESS,
        items: [],
      },
    });

    expect(wrapper.find('Grid')).not.toExist();
  });

  it('should render the Grid if data exists', () => {
    wrapper.setProps({
      posts: {
        items: [
          {
            id: 12,
            title: 'magic-tricks',
            body: 'nothing much',
          },
        ],
        status: STATUS.SUCCESS,
      },
    });

    expect(wrapper.find('Grid')).toMatchSnapshot();
  });
});
