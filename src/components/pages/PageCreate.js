import React from 'react';
import { Create, SimpleForm, required } from 'react-admin';

import TranslatedTextInput from '../TranslatedTextInput';

function PageCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm redirect="list">
        <TranslatedTextInput source="title" validate={required()} />
        <TranslatedTextInput rich={true} source="body" validate={required()} />
      </SimpleForm>
    </Create>
  );
}

export default PageCreate;
