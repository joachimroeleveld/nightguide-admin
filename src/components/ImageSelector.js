import React from 'react';
import _ from 'lodash';
import { SelectInput } from 'react-admin';
import PropTypes from 'prop-types';

ImageSelector.propTypes = {
  ...SelectInput.propTypes,
  imagesSource: PropTypes.string.isRequired,
};

function ImageSelector(props) {
  const { imagesSource, record = {}, ...otherProps } = props;

  const images = _.get(record, imagesSource) || [];

  return (
    <SelectInput
      record={record}
      choices={images.map(image => ({
        id: image.id,
        name: image.id,
      }))}
      {...otherProps}
    />
  );
}

export default ImageSelector;
