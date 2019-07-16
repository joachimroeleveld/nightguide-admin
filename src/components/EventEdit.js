import React, { Fragment } from 'react';
import {
  EditController,
  EditView,
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
  required,
  SelectInput,
  AutocompleteArrayInput,
  regex,
} from 'react-admin';
import { connect } from 'react-redux';

import GoogleImage from './GoogleImage';
import { __src } from '../services/i18n';
import TranslatedTextInput from './TranslatedTextInput';
import { getPageSlugs } from '../state/cities';

function EventEdit(props) {
  const { pageSlug, pageSlugs, dispatch, ...otherProps } = props;

  return (
    <EditController undoable={false} {...otherProps}>
      {controllerProps => {
        const { record } = controllerProps;
        const isFbEvent = record && record.facebook;
        return (
          <EditView {...otherProps} {...controllerProps}>
            <TabbedForm>
              <FormTab label="General">
                <SelectInput
                  validate={required()}
                  source="pageSlug"
                  choices={pageSlugs.map(slug => ({
                    id: slug,
                    name: slug,
                  }))}
                />
                <TextInput source="title" />
                <TranslatedTextInput source="description" rich={true} />
                <ReferenceArrayInput
                  label="Tags"
                  reference="tags"
                  source="tags"
                >
                  <SelectArrayInput optionText={__src('name')} />
                </ReferenceArrayInput>
                <BooleanInput source="admin.hide" label="Hide" />
              </FormTab>
              <FormTab label="Dates">
                <BooleanInput
                  source="facebook.datesChanged"
                  label="Dates changed"
                />
                <ArrayInput validate={required()} source="dates">
                  <SimpleFormIterator disableAdd={() => isFbEvent}>
                    <DateTimeInput
                      disabled={isFbEvent}
                      validate={required()}
                      source="from"
                    />
                    <DateTimeInput
                      disabled={isFbEvent}
                      source="to"
                      parse={v => (v ? v : undefined)}
                    />
                    <ReferenceArrayInput
                      label="Artists"
                      source="artists"
                      reference="artists"
                    >
                      <AutocompleteArrayInput optionText="name" />
                    </ReferenceArrayInput>
                    <div
                      style={{ border: '5px dashed #ddd', margin: '1em 0' }}
                    />
                  </SimpleFormIterator>
                </ArrayInput>
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
                  validate={regex(/^https?:\/\/.+\..+/, 'Not a valid URL')}
                  type="url"
                />
              </FormTab>
            </TabbedForm>
          </EditView>
        );
      }}
    </EditController>
  );
}

export default connect(state => ({
  pageSlug: state.cities.pageSlug,
  pageSlugs: getPageSlugs(state),
}))(EventEdit);
