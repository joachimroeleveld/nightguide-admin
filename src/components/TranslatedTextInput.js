import React from 'react';
import { TextInput } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

const TranslatedTextInput = props => {
  const { source, rich = false, ...otherProps } = props;

  const InputComponent = rich ? RichTextInput : TextInput;
  return <InputComponent {...props} source={`${source}.en`} />;
};

TranslatedTextInput.defaultProps = {
  addLabel: true,
};

export default TranslatedTextInput;
