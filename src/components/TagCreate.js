import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

import TranslatedTextInput from './TranslatedTextInput';

function TagCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm redirect="list">
        <TextInput source="slug" label="Slug" />
        <TranslatedTextInput source="name" label="Name" />
      </SimpleForm>
    </Create>
  );
}

export default TagCreate;
