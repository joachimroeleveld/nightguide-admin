import React from 'react';
import { Edit, SimpleForm, required } from 'react-admin';

import TranslatedTextInput from '../TranslatedTextInput';

function PageEdit(props) {
  return (
    <Edit undoable={false} {...props}>
      <SimpleForm>
        <TranslatedTextInput source="title" validate={required()} />
        <TranslatedTextInput rich={true} source="body" validate={required()} />
      </SimpleForm>
    </Edit>
  );
}

export default PageEdit;
