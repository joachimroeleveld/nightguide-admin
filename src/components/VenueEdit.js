import React from 'react';
import {
  Edit,
  TextField,
  SimpleForm,
  ReferenceArrayInput,
  SelectArrayInput,
  TextInput,
} from 'react-admin';

import { __src } from '../services/i18n';
import TranslatedTextInput from './TranslatedTextInput';

function VenueEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextField source="id" />
        <TextInput source="name" />
        <ReferenceArrayInput label="Tags" reference="tags" source="tags">
          <SelectArrayInput optionText={__src('name')} />
        </ReferenceArrayInput>
        <TranslatedTextInput
          rich={true}
          source="description"
          label="Description"
        />
      </SimpleForm>
    </Edit>
  );
}

export default VenueEdit;
