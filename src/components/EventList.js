import React from 'react';
import {
  Filter,
  TextInput,
  List,
  Datagrid,
  TextField,
  ReferenceField,
  DateInput,
} from 'react-admin';

import GoogleImage from './GoogleImage';
import EventDates from './EventDates';

const EventFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="text" alwaysOn />
    <DateInput source="dateFrom" />
  </Filter>
);

function EventList(props) {
  return (
    <List
      {...props}
      filters={<EventFilter />}
      filterDefaultValues={{ dateFrom: new Date() }}
    >
      <Datagrid rowClick="show">
        <GoogleImage source="images[0].url" size="48" label="" />
        <ReferenceField
          label="Venue"
          source="organiser.venue"
          reference="venues"
          linkType="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <EventDates source="dates" label="Next date" items={1} />
        <TextField source="title" />
        <TextField source="facebook.id" />
        <TextField source="facebook.title" />
      </Datagrid>
    </List>
  );
}

export default EventList;
