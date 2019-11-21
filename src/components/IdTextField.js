import _ from 'lodash';
import React from 'react';

export default function IdTextField(props) {
  const { record = {} } = props;

  let id = _.get(record, 'id');

  return <div>{id}</div>;
}
