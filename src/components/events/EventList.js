import React from 'react';
import {
  Filter,
  TextInput,
  List,
  Datagrid,
  TextField,
  ReferenceField,
  DateInput,
  FormDataConsumer,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin';
import { connect } from 'react-redux';

import GoogleImage from '../GoogleImage';
import EventDates from './EventDates';
import PageSlugFilterUpdater from '../PageSlugFilterUpdater';

const EventFilter = connect(state => ({
  pageSlug: state.cities.pageSlug,
}))(props => {
  const { pageSlug, dispatch, ...otherProps } = props;
  return (
    <Filter {...otherProps}>
      <FormDataConsumer form="filterForm" source="foo" alwaysOn>
        {({ dispatch }) => <PageSlugFilterUpdater formDispatch={dispatch} />}
      </FormDataConsumer>
      <TextInput label="Search" source="text" alwaysOn />
      <ReferenceInput
        label="Venue"
        source="venue"
        reference="venues"
        filter={{ pageSlug }}
        alwaysOn
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <DateInput source="dateFrom" />
      <DateInput source="dateTo" />
      <DateInput source="createdAfter" />
      <DateInput source="createdBefore" />
      <BooleanInput label="Facebook dates changed" source="datesChanged" />
      <BooleanInput label="Show hidden" source="showHidden" />
      <BooleanInput label="Tagged" source="tagged" />
      <TextInput source="pageSlug" />
    </Filter>
  );
});

function EventList(props) {
  return (
    <List
      {...props}
      filters={<EventFilter />}
      filterDefaultValues={{ dateFrom: new Date() }}
    >
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <GoogleImage source="images[0].url" size="48" label="" />
        <ReferenceField
          label="Venue"
          source="organiser.venue"
          reference="venues"
          linkType={false}
        >
          <TextField source="name" />
        </ReferenceField>
        <EventDates source="date" label="Next date" />
        <TextField source="title" />
        <TextField source="facebook.title" />
      </Datagrid>
    </List>
  );
}

export default EventList;
