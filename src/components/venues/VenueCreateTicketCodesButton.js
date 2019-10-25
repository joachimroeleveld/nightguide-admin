// in src/comments/ApproveButton.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withDataProvider } from 'react-admin';

import { GENERATE_TICKET_CODES } from '../../services/api/venues';

class VenueCreateTicketCodesButton extends Component {
  handleClick = () => {
    const { record, dataProvider } = this.props;
    dataProvider(
      GENERATE_TICKET_CODES,
      'venues',
      { id: record.id },
      {
        onSuccess: {
          notification: { body: 'Ticket codes generated', level: 'info' },
          refresh: '/comments',
        },
        onFailure: {
          notification: {
            body: 'Error: ticket codes not generated',
            level: 'warning',
          },
        },
      }
    );
  };

  render() {
    return (
      <Button color="primary" onClick={this.handleClick}>
        {'Generate ticket codes'}
      </Button>
    );
  }
}

VenueCreateTicketCodesButton.propTypes = {
  record: PropTypes.object,
};

export default withDataProvider(VenueCreateTicketCodesButton);
