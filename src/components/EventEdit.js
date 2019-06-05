import React from 'react';
import {
  Edit,
  ReferenceArrayInput,
  TextInput,
  SelectArrayInput,
  ImageInput,
  SimpleForm,
} from 'react-admin';

import GoogleImage from './GoogleImage';

function EventEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <ImageInput
          source="images"
          accept="image/*"
          maxSize={5000000} // 5MB
          multiple
        >
          <GoogleImage source="url" size={230} />
        </ImageInput>
        <ReferenceArrayInput label="Tags" reference="tags" source="tags">
          <SelectArrayInput optionText="id" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
}

export default EventEdit;
