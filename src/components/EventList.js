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
} from 'react-admin';

import GoogleImage from './GoogleImage';
import EventDates from './EventDates';
import PageSlugFilterUpdater from './PageSlugFilterUpdater';

const EventFilter = props => {
  return (
    <Filter {...props}>
      <FormDataConsumer form="filterForm" source="foo" alwaysOn>
        {({ dispatch }) => <PageSlugFilterUpdater formDispatch={dispatch} />}
      </FormDataConsumer>
      <TextInput label="Search" source="text" alwaysOn />
      <DateInput source="dateFrom" />
      <DateInput source="dateTo" />
      <BooleanInput label="Show hidden" source="showHidden" />
      <BooleanInput label="Tagged" source="tagged" />
      <TextInput source="pageSlug" />
    </Filter>
  );
};

function EventList(props) {
  return (
    <List
      {...props}
      filters={<EventFilter />}
      filterDefaultValues={{
        dateFrom: new Date(),
        tagged: false,
      }}
    >
      <Datagrid rowClick="edit">
        <GoogleImage source="images[0].url" size="48" label="" />
        <ReferenceField
          label="Venue"
          source="organiser.venue"
          reference="venues"
          linkType="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <EventDates source="date" label="Next date" items={1} />
        <TextField source="title" />
        <TextField source="facebook.title" />
      </Datagrid>
    </List>
  );
}

export default EventList;
