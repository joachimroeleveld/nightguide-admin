import React from 'react';
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
  AutocompleteInput,
} from 'react-admin';
import { connect } from 'react-redux';

import GoogleImage from './GoogleImage';
import { __src } from '../services/i18n';
import TranslatedTextInput from './TranslatedTextInput';
import { getPageSlugs } from '../state/cities';

function EventEdit(props) {
  const { pageSlug, pageSlugs, dispatch, ...otherProps } = props;

  return (
    <EditController {...otherProps}>
      {controllerProps => (
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
              <ReferenceArrayInput label="Tags" reference="tags" source="tags">
                <SelectArrayInput optionText={__src('name')} />
              </ReferenceArrayInput>
              <BooleanInput source="admin.hide" label="Hide" />
            </FormTab>
            {controllerProps.record && !controllerProps.record.facebook && (
              <FormTab label="Dates">
                <ArrayInput validate={required()} source="dates">
                  <SimpleFormIterator>
                    <DateTimeInput validate={required()} source="from" />
                    <DateTimeInput
                      source="to"
                      parse={v => (v ? v : undefined)}
                    />
                  </SimpleFormIterator>
                </ArrayInput>
              </FormTab>
            )}
            <FormTab label="Lineup">
              <ReferenceArrayInput
                label="Artists"
                source="artists"
                reference="artists"
              >
                <AutocompleteInput optionText="name" />
              </ReferenceArrayInput>
            </FormTab>
            <FormTab label="Tickets">
              <TextInput
                label="Ticket page URL"
                source="tickets.checkoutUrl"
                type="url"
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
              <TextInput label="Video URL" source="videoUrl" type="url" />
            </FormTab>
          </TabbedForm>
        </EditView>
      )}
    </EditController>
  );
}

export default connect(state => ({
  pageSlug: state.cities.pageSlug,
  pageSlugs: getPageSlugs(state),
}))(EventEdit);
