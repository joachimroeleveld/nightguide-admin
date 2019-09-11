import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceManyField,
  Datagrid,
} from 'react-admin';

import EventDates from '../events/EventDates';
import GoogleImage from '../GoogleImage';
import TranslatedTextField from '../TranslatedTextField';

function VenueEdit(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TranslatedTextField rich={true} source={'description'} />
        <ReferenceManyField label="Events" reference="events" target="venue">
          <Datagrid rowClick="show">
            <GoogleImage source="images[0].url" size="48" label="" />
            <EventDates source="dates" label="Next date" />
            <TextField source="title" />
            <TextField source="facebook.title" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
}

export default VenueEdit;
