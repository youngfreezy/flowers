/* eslint-disable react/sort-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { appColor } from 'modules/theme';

import { getPosts, saveEntry } from 'actions';
import { STATUS } from 'constants/index';

import { Heading, Paragraph, theme, utils } from 'styled-minimal';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Loader from 'components/Loader';
import Modal from 'components/Modal';

const { responsive, spacer } = utils;
const { grays } = theme;

const PostsGridLayout = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${spacer(2)};
  grid-template-columns: 100%;
  list-style: none;
  margin: ${spacer(4)} auto 0;
  padding: 0;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      ix: `
        grid-gap: ${spacer(3)(p)};
        width: 90%;
      `,
      md: `
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
      `,
      lg: `
        grid-template-columns: repeat(3, 1fr);
      `,
      xl: `
        grid-gap: ${spacer(4)(p)};
        grid-template-columns: repeat(4, 1fr);
      `,
    })};
  /* stylelint-enable */

  > li {
    display: flex;
  }
`;

const Item = styled.div`
  align-items: center;
  border: solid 0.1rem ${appColor};
  border-radius: 0.4rem;
  overflow: hidden;
  padding: ${spacer(3)};
  text-align: center;
  width: 100%;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      md: `
        padding: ${spacer(3)(p)};
      `,
      lg: `
        padding: ${spacer(4)(p)};
      `,
    })};
  /* stylelint-enable */

  p {
    color: #000;
  }

  img {
    height: 8rem;
    margin-bottom: ${spacer(2)};
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacer(3)};

  small {
    color: ${grays.gray60};
  }
`;

export class PostsGrid extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      detailView: {},
      entrySaved: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getPosts());
  }

  handleAutoCompleteSelection = (event, newValue) => {
    const { body, title, id } = newValue;

    this.setState({ detailView: { body, id, title } }, () => {
      this.handleOpen();
    });
  };

  handleModalAutoCompleteSelection = (event, newValue) => {
    if (newValue) {
      const { body, title, id } = newValue;

      this.setState({ detailView: { body, id, title } });
    }
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleEdits = e => {
    e.persist();
    const { detailView } = this.state;
    this.setState({
      detailView: {
        ...detailView,
        [e.target.getAttribute('name')]: e.target.value,
      },
    });
  };

  saveEntry = () => {
    const { detailView, entrySaved } = this.state;
    const { dispatch } = this.props;
    dispatch(saveEntry(detailView));
    this.setState({ entrySaved: entrySaved + 1 });
  };

  handlers = {
    handleClose: this.handleClose,
    handleAutoCompleteSelection: this.handleAutoCompleteSelection,
    handleModalAutoCompleteSelection: this.handleModalAutoCompleteSelection,
    saveEntry: this.saveEntry,
    handleEdits: this.handleEdits,
  };

  render() {
    const { posts } = this.props;
    const { open } = this.state;
    const data = posts.items || [];
    let output;
    if (posts.status === STATUS.SUCCESS) {
      output = (
        <div>
          <Autocomplete
            key={open}
            id="combo-box-demo2"
            options={data}
            getOptionLabel={option => option.title}
            onChange={this.handleAutoCompleteSelection}
            style={{ width: '20%', marginLeft: '40%' }}
            renderInput={params => (
              <TextField {...params} label="Search by title" variant="outlined" />
            )}
          />
          {/* TODO: pagination. */}
          <PostsGridLayout data-testid="PostsGrid">
            {data.map(d => (
              <li key={d.id}>
                <Item>
                  <ItemHeader>
                    <Heading as="h5" lineHeight={1}>
                      {d.title}
                    </Heading>
                  </ItemHeader>
                  <Paragraph>{d?.body}</Paragraph>
                </Item>
              </li>
            ))}
          </PostsGridLayout>
          <Modal state={this.state} handlers={this.handlers} autoCompleteItems={data} />
        </div>
      );
    } else {
      output = <Loader block />;
    }
    return (
      <div key="PostsGrid" data-testid="PostsGridWrapper">
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps)(PostsGrid);
