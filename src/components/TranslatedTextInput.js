import React from 'react';
import { TextInput } from 'react-admin';

import MarkdownInput from './MarkdownInput';

const TranslatedTextInput = props => {
  const { source, rich = false, ...otherProps } = props;

  const InputComponent = rich ? MarkdownInput : TextInput;
  return <InputComponent {...props} source={`${source}.en`} />;
};

TranslatedTextInput.defaultProps = {
  addLabel: true,
  fullWidth: true,
};

export default TranslatedTextInput;
