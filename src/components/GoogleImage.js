import React from 'react';
import _ from 'lodash';

export default function GoogleImage(props) {
  const { source, record = {}, size, alt = '' } = props;

  let src = _.get(record, source);

  if (!src) {
    return null;
  }

  if (size && src.match(/googleusercontent\.com/)) {
    src += `=s${size}`;
  }

  return <img alt={alt} src={src} />;
}
