import React from 'react';
import _ from 'lodash';
import { TextField, SimpleFormIterator, ArrayInput } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

const TranslatableTextInput = props => {
  const { source, record = {}, ...otherProps } = props;

  const translatedObj = _.get(record, source);
  if (translatedObj) {
    const translations = Object.keys(translatedObj).map(key => ({
      lang: key,
      val: translatedObj[key],
    }));

    return (
      <ArrayInput
        record={{ translations }}
        source="translations"
        {...otherProps}
      >
        <SimpleFormIterator>
          <AutocompleteArrayInput source="category" choices={[
    { id: 'programming', name: 'Programming' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'photography', name: 'Photography' },
]} />
          <RichTextInput source="value" />
        </SimpleFormIterator>
      </ArrayInput>
    );
  }
  return null;
};

TranslatableTextInput.defaultProps = {
  addLabel: true,
};

export default TranslatableTextInput;
