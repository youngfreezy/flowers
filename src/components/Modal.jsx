import React from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Button } from 'styled-minimal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

export class EditableModal extends React.Component {
  static propTypes = {
    autoCompleteItems: PropTypes.array.isRequired,
    handlers: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
  };

  render() {
    //   redux / actions felt like overkill for one level of prop passing.
    const { handlers, autoCompleteItems, state } = this.props;
    const { open, entrySaved, detailView } = state;
    return (
      <Modal
        open={open}
        onClose={handlers.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            top: '25%',
            left: '30%',
            position: 'absolute',
            width: '40%',
            backgroundColor: 'azure',
            border: '2px solid #000',
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            padding: '5%',
          }}
        >
          <Autocomplete
            key={entrySaved}
            id="combo-box-demo"
            options={autoCompleteItems}
            getOptionLabel={option => option.title}
            onChange={handlers.handleModalAutoCompleteSelection}
            style={{ width: '88%', marginTop: '2%', marginBottom: '10%' }}
            renderInput={params => (
              <TextField {...params} label="Search by title" variant="outlined" />
            )}
          />
          Title:
          <TextField
            name="title"
            variant="outlined"
            value={detailView?.title}
            onChange={handlers.handleEdits}
            style={{ width: '88%', marginTop: '2%', marginBottom: '5%' }}
          />
          Description:
          <TextField
            name="body"
            variant="outlined"
            value={detailView?.body}
            onChange={handlers.handleEdits}
            style={{ width: '88%', marginBottom: '40px' }}
          />
          <Button
            variant="primary"
            color="primary"
            onClick={handlers.saveEntry}
            style={{ width: '88%' }}
          >
            Save
          </Button>
        </div>
      </Modal>
    );
  }
}

export default EditableModal;
