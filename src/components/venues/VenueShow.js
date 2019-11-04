import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceManyField,
  Datagrid,
  EditButton,
  UrlField,
} from 'react-admin';
import CardActions from '@material-ui/core/CardActions';

import EventDates from '../events/EventDates';
import GoogleImage from '../GoogleImage';
import VenueCreateTicketCodesButton from './VenueCreateTicketCodesButton';

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};

const VenueShowActions = ({ basePath, data, resource }) => (
  <CardActions style={cardActionStyle}>
    <EditButton basePath={basePath} record={data} />
    <VenueCreateTicketCodesButton record={data} />
  </CardActions>
);

function VenueShow(props) {
  return (
    <Show actions={<VenueShowActions />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <UrlField
          label="Ticket codes PDF"
          source="tickets.pdfUrl"
          target="_blank"
        />
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

export default VenueShow;
