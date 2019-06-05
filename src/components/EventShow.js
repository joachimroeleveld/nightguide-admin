import React from 'react';
import {
  Show,
  ReferenceArrayField,
  TextField,
  SingleFieldList,
  ChipField,
  RichTextField,
  TabbedShowLayout,
  Tab,
  ArrayField,
  ReferenceField,
} from 'react-admin';

import GoogleImage from './GoogleImage';
import FbEventUrl from './FbEventUrl';
import EventDates from './EventDates';

function EventEdit(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="General">
          <ReferenceField
            label="Venue"
            source="organiser.venue"
            reference="venues"
            linkType="show"
          >
            <TextField source="name" />
          </ReferenceField>
          <TextField source="title" />
          <EventDates source="dates" />
          <ArrayField source="images">
            <SingleFieldList>
              <GoogleImage source="url" size={230} />
            </SingleFieldList>
          </ArrayField>
          <ReferenceArrayField label="Tags" reference="tags" source="tags">
            <SingleFieldList>
              <ChipField source="id" />
            </SingleFieldList>
          </ReferenceArrayField>
        </Tab>
        <Tab label="Facebook">
          <TextField label="ID" source="facebook.id" />
          <FbEventUrl label="Event page" source="facebook.id" />
          <TextField label="Title" source="facebook.title" />
          <RichTextField label="Description" source="facebook.description" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

export default EventEdit;
