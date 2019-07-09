import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

function ArtistEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Edit>
  );
}

export default ArtistEdit;
