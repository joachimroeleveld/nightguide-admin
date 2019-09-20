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
  DateTimeInput,
  required,
  SelectInput,
  AutocompleteArrayInput,
  regex,
} from 'react-admin';
import { connect } from 'react-redux';

import ticketProviders from './ticket-providers';
import GoogleImage from '../GoogleImage';
import { __src } from '../../services/i18n';
import TranslatedTextInput from '../TranslatedTextInput';
import FormAccordion from '../FormAccordion';
import { getPageSlugs } from '../../state/cities';
import EventDates from './EventDates';

function EventEdit(props) {
  const { pageSlug, pageSlugs, dispatch, ...otherProps } = props;

  return (
    <EditController undoable={false} {...otherProps}>
      {controllerProps => {
        const { record } = controllerProps;
        const isFbEvent = record && record.facebook && record.facebook.id;
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
                <ReferenceArrayInput
                  label="Artists (all dates)"
                  source="artists"
                  reference="artists"
                >
                  <AutocompleteArrayInput optionText="name" />
                </ReferenceArrayInput>
                <BooleanInput source="admin.hide" label="Hide" />
              </FormTab>
              <FormTab label="Dates">
                <BooleanInput
                  source="facebook.datesChanged"
                  label="Dates changed"
                />
                <ArrayInput
                  validate={required()}
                  source="dates"
                  style={{ width: '100%' }}
                >
                  <FormAccordion
                    renderLabel={record => (
                      <EventDates record={{ dates: record }} source="dates" />
                    )}
                    disableAdd={() => isFbEvent}
                  >
                    <DateTimeInput
                      source="from"
                      disabled={isFbEvent}
                      validate={required()}
                    />
                    <DateTimeInput
                      source="to"
                      disabled={isFbEvent}
                      parse={v => (v ? v : undefined)}
                    />
                    <ReferenceArrayInput
                      label="Artists"
                      source="artists"
                      reference="artists"
                    >
                      <AutocompleteArrayInput optionText="name" />
                    </ReferenceArrayInput>
                    <TextInput
                      label="Ticket redirect URL"
                      source="ticketsUrl"
                      type="url"
                      validate={regex(/^https?:\/\/.+\..+/, 'Not a valid URL')}
                    />
                    <TextInput
                      label="Provider event ID"
                      source="providerEventId"
                    />
                    <NumberInput
                      source={'interestedCount'}
                      label={'Interested count'}
                      parse={v => (v !== null ? v : undefined)}
                    />
                  </FormAccordion>
                </ArrayInput>
              </FormTab>
              <FormTab label="Tickets">
                <SelectInput
                  source={'tickets.provider'}
                  label={'Provider'}
                  choices={ticketProviders}
                />
                <TextInput
                  label="Ticket redirect URL"
                  source="tickets.checkoutUrl"
                  type="url"
                  validate={regex(/^https?:\/\/.+\..+/, 'Not a valid URL')}
                />
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
