import React from 'react';
import _ from 'lodash';

import IdTextField from './IdTextField';

export default function GoogleImage(props) {
  const { source, record = {}, showIdField = false, size, alt = '' } = props;

  let src = _.get(record, source);

  if (!src) {
    return null;
  }

  if (size && src.match(/googleusercontent\.com/)) {
    src += `=s${size}`;
  }

  return (
    <figure>
      <img alt={alt} src={src} />
      {showIdField && <IdTextField record={record} />}
    </figure>
  );
}
