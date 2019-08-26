import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

function ArtistCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm redirect="list">
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
}

export default ArtistCreate;
