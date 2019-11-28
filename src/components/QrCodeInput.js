import React from 'react';
import { TextInput, SelectInput } from 'react-admin';
import _ from 'lodash';

const QR_CODE_VERSIONS = _.range(1, 41).map(version => ({
  id: version.toString(),
  name: version,
}));

const QrCodeInput = props => {
  const { source, label, ...otherProps } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SelectInput
        label={'QR code version'}
        source={`${source}.version`}
        choices={QR_CODE_VERSIONS}
        style={{ marginRight: '1em' }}
        {...otherProps}
      />
      <TextInput
        label={'QR code text'}
        source={`${source}.text`}
        {...otherProps}
      />
    </div>
  );
};

QrCodeInput.defaultProps = {
  addLabel: true,
};

export default QrCodeInput;
