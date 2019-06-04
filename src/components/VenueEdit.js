import React from 'react';
import {
  Edit,
  TextField,
  SimpleForm,
  ReferenceArrayInput,
  SelectArrayInput,
  TextInput,
} from 'react-admin';

function VenueEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextField source="id" />
        <TextInput source="name" />
        <ReferenceArrayInput label="Tags" reference="tags" source="tags">
          <SelectArrayInput optionText="id" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
}

export default VenueEdit;
