import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

function TagCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="id" />
      </SimpleForm>
    </Create>
  );
}

export default TagCreate;
