import React from 'react';
import { Edit, SimpleForm, TextField } from 'react-admin';

function TagEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextField source="id" />
      </SimpleForm>
    </Edit>
  );
}

export default TagEdit;
