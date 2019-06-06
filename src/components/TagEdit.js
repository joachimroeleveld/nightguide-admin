import React from 'react';
import { Edit, SimpleForm, TextField, TextInput } from 'react-admin';
import TranslatedTextInput from './TranslatedTextInput';

function TagEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextField source="id" />
        <TextInput source="slug" label="Slug" />
        <TranslatedTextInput source="name" label="Name" />
      </SimpleForm>
    </Edit>
  );
}

export default TagEdit;
