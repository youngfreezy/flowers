import reducer from 'reducers/app';

describe('App', () => {
  const app = reducer.app(undefined, {});

  it('should return the initial state', () => {
    expect(reducer.app(app, {})).toMatchSnapshot();
  });
});
