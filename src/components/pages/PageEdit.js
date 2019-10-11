import React from 'react';
import { Edit, SimpleForm, required, TextInput } from 'react-admin';

import TranslatedTextInput from '../TranslatedTextInput';

function PageEdit(props) {
  return (
    <Edit undoable={false} {...props}>
      <SimpleForm redirect="edit">
        <TranslatedTextInput source="title" validate={required()} />
        <TextInput source="urlSlugs.0" label="URL slug" />
        <TranslatedTextInput rich={true} source="body" validate={required()} />
      </SimpleForm>
    </Edit>
  );
}

export default PageEdit;
