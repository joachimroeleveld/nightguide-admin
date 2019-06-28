import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceArrayField,
  ChipField,
  SingleFieldList,
  ReferenceManyField,
  Datagrid,
} from 'react-admin';

import { __src } from '../services/i18n';
import EventDates from '../components/EventDates';
import GoogleImage from '../components/GoogleImage';

function VenueEdit(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source={__src('description')} />
        <ReferenceArrayField label="Tags" reference="tags" source="tags">
          <SingleFieldList>
            <ChipField source={__src('name')} />
          </SingleFieldList>
        </ReferenceArrayField>
        <ReferenceManyField label="Events" reference="events" target="venue">
          <Datagrid rowClick="show">
            <GoogleImage source="images[0].url" size="48" label="" />
            <EventDates source="dates" label="Next date" items={1} />
            <TextField source="title" />
            <TextField source="facebook.title" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
}

export default VenueEdit;
