import React from 'react';
import _ from 'lodash';

const OrderTicketDownloadLinkField = ({ record = {}, label }) => {
  if (_.get(record, 'downloads.key')) {
    return (
      <a
        target="_blank"
        href={`${process.env.REACT_APP_API_URL}/orders/${record.id}/downloads?key=${record.downloads.key}`}
      >
        {label}
      </a>
    );
  }
  return null;
};

OrderTicketDownloadLinkField.defaultProps = {
  addLabel: true,
};

export default OrderTicketDownloadLinkField;
