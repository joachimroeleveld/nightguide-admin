import React from 'react';
import { connect } from 'react-redux';
import {
  required,
  ReferenceInput,
  AutocompleteInput,
  Create,
  ReferenceArrayInput,
  TextInput,
  SelectArrayInput,
  ImageInput,
  TabbedForm,
  BooleanInput,
  FormTab,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  DateTimeInput,
  SelectInput,
  AutocompleteArrayInput,
  regex,
} from 'react-admin';

import GoogleImage from './GoogleImage';
import { __src } from '../services/i18n';
import TranslatedTextInput from './TranslatedTextInput';
import { getPageSlugs } from '../state/cities';

function EventCreate(props) {
  const { pageSlug, pageSlugs, dispatch, ...otherProps } = props;
  return (
    <Create {...otherProps}>
      <TabbedForm>
        <FormTab label="General">
          <SelectInput
            validate={required()}
            source="pageSlug"
            defaultValue={pageSlug}
            choices={pageSlugs.map(slug => ({
              id: slug,
              name: slug,
            }))}
          />
          <TextInput validate={required()} source="title" />
          <TranslatedTextInput source="description" rich={true} />
          <ReferenceArrayInput label="Tags" reference="tags" source="tags">
            <SelectArrayInput optionText={__src('name')} />
          </ReferenceArrayInput>
          <BooleanInput source="admin.hide" label="Hide" />
        </FormTab>
        <FormTab label="Dates">
          <ArrayInput validate={required()} source="dates">
            <SimpleFormIterator>
              <DateTimeInput validate={required()} source="from" />
              <DateTimeInput source="to" parse={v => (v ? v : undefined)} />
              <ReferenceArrayInput
                label="Artists"
                source="artists"
                reference="artists"
              >
                <AutocompleteArrayInput optionText="name" />
              </ReferenceArrayInput>
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab label="Location">
          <TextInput
            source="location.type"
            defaultValue="venue"
            disabled={true}
          />
          <ReferenceInput
            validate={required()}
            label="Venue"
            source="organiser.venue"
            reference="venues"
            filter={{ pageSlug }}
          >
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
        </FormTab>
        <FormTab label="Tickets">
          <TextInput
            label="Ticket page URL"
            source="tickets.checkoutUrl"
            type="url"
            validate={regex(/^https?:\/\/.+\..+/, 'Not a valid URL')}
          />
          <NumberInput label="From price" source="tickets.priceFrom" />
        </FormTab>
        <FormTab label="Media">
          <ImageInput
            source="images"
            accept="image/*"
            maxSize={5000000} // 5MB
            multiple
          >
            <GoogleImage source="url" size={230} />
          </ImageInput>
          <TextInput
            label="Video URL"
            source="videoUrl"
            type="url"
            validate={regex(/^https?:\/\/.+\..+/, 'Not a valid URL')}
          />
        </FormTab>
      </TabbedForm>
    </Create>
  );
}

export default connect(state => ({
  pageSlug: state.cities.pageSlug,
  pageSlugs: getPageSlugs(state),
}))(EventCreate);
