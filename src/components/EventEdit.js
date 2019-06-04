import React from 'react';
import {
  Edit,
  ReferenceArrayInput,
  TextInput,
  SelectArrayInput,
  TextField,
  RichTextField,
  ImageInput,
  TabbedForm,
  FormTab,
} from 'react-admin';

import GoogleImage from './GoogleImage';
import FbEventUrl from './FbEventUrl';
import EventDates from './EventDates'

function EventEdit(props) {
  return (
    <Edit {...props}>
      <TabbedForm>
        <FormTab label="General">
          <TextField label="ID" source="id" />
          <TextInput source="title" />
          <EventDates source="dates" />
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
        </FormTab>
        <FormTab label="Facebook">
          <TextField label="ID" source="facebook.id" />
          <FbEventUrl label="Event page" source="facebook.id" />
          <TextField label="Title" source="facebook.title" />
          <RichTextField label="Description" source="facebook.description" />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
}

export default EventEdit;
