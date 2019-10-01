import React from 'react';
import _ from 'lodash';

export default function GoogleImage(props) {
  const { source, record = {}, captionSource, size, alt = '' } = props;

  let src = _.get(record, source);
  let caption = _.get(record, captionSource);

  if (!src) {
    return null;
  }

  if (size && src.match(/googleusercontent\.com/)) {
    src += `=s${size}`;
  }

  return (
    <figure>
      <img alt={alt} src={src} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
