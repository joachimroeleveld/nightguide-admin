import React from 'react';
import { Edit, SimpleForm, TextField } from 'react-admin';
import TranslatedTextInput from './TranslatedTextInput';

function TagEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextField source="id" />
        <TranslatedTextInput source="name" label="Name" />
      </SimpleForm>
    </Edit>
  );
}

export default TagEdit;
