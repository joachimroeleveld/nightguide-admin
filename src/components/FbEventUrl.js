import React from 'react';
import _ from 'lodash';

const FbEventUrl = ({ source, record = {}, label }) => {
  const val = _.get(record, source);
  if (val) {
    return (
      <a target="_blank" href={`https://facebook.com/events/${val}`}>{label}</a>
    );
  }
  return null;
};

FbEventUrl.defaultProps = {
  addLabel: true,
};

export default FbEventUrl;
