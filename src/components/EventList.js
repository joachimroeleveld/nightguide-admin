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
      <TextInput source="pageSlug" />
      <DateInput source="dateFrom" />
      <DateInput source="dateTo" />
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
      }}
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
        <TextField source="facebook.title" />
      </Datagrid>
    </List>
  );
}

export default EventList;
