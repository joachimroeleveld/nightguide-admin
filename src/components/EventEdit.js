import React from 'react';
import {
  Edit,
  ReferenceArrayInput,
  TextInput,
  SelectArrayInput,
  ImageInput,
  TabbedForm,
  BooleanInput,
  FormTab,
  NumberInput,
} from 'react-admin';

import GoogleImage from './GoogleImage';
import { __src } from '../services/i18n';
import TranslatedTextInput from './TranslatedTextInput';

function EventEdit(props) {
  return (
    <Edit {...props}>
      <TabbedForm>
        <FormTab label="General">
          <TextInput source="title" />
          <TranslatedTextInput source="description" rich={true} />
          <ImageInput
            source="images"
            accept="image/*"
            maxSize={5000000} // 5MB
            multiple
          >
            <GoogleImage source="url" size={230} />
          </ImageInput>
          <ReferenceArrayInput label="Tags" reference="tags" source="tags">
            <SelectArrayInput optionText={__src('name')} />
          </ReferenceArrayInput>
          <BooleanInput source="admin.hide" label="Hide" />
        </FormTab>
        <FormTab label="Events">
          <TextInput
            label="Ticket page URL"
            source="tickets.checkoutUrl"
            type="url"
          />
          <NumberInput label="From price" source="tickets.priceFrom" />
        </FormTab>
        <FormTab label="Video">
          <TextInput label="Video URL" source="videoUrl" type="url" />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
}

export default EventEdit;
