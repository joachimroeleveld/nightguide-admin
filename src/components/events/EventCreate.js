import React from 'react';
import { connect } from 'react-redux';
import {
  required,
  ReferenceInput,
  SimpleFormIterator,
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
  DateTimeInput,
  SelectInput,
  AutocompleteArrayInput,
  regex,
} from 'react-admin';

import GoogleImage from '../GoogleImage';
import { __src } from '../../services/i18n';
import TranslatedTextInput from '../TranslatedTextInput';
import { getPageSlugs } from '../../state/cities';
import FormAccordion from '../FormAccordion';
import EventDates from './EventDates';
import EventTicketProviderFields from './EventTicketProviderFields';

function EventCreate(props) {
  const { pageSlug, pageSlugs, dispatch, ...otherProps } = props;
  return (
    <Create {...otherProps}>
      <TabbedForm redirect="list">
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
          <ArrayInput
            validate={required()}
            source="dates"
            style={{ width: '100%' }}
          >
            <FormAccordion
              renderLabel={record => (
                <EventDates record={{ dates: record }} source="dates" />
              )}
            >
              <DateTimeInput
                parse={v => (v ? new Date(v).toISOString() : undefined)}
                validate={required()}
                source="from"
              />
              <DateTimeInput
                parse={v => (v ? new Date(v).toISOString() : undefined)}
                source="to"
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
              <TextInput label="Provider event ID" source="providerEventId" />
              <NumberInput
                source={'interestedCount'}
                label={'Interested count'}
                parse={v => (v !== null ? v : undefined)}
              />
              <BooleanInput source="isHot" label="Is hot" />
            </FormAccordion>
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
          <ArrayInput source="tickets.products" label="Products">
            <SimpleFormIterator>
              <TextInput label="Name" source="name" />
              <NumberInput label="Price" source="price" />
            </SimpleFormIterator>
          </ArrayInput>
          <NumberInput source="tickets.displayPrice" label="Display price" />
          <TextInput
            label="Ticket redirect URL"
            source="tickets.checkoutUrl"
            type="url"
            validate={regex(/^https?:\/\/.+\..+/, 'Not a valid URL')}
          />
          <EventTicketProviderFields />
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
