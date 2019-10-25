import React from 'react';
import {
  Show,
  TextField,
  Tab,
  ReferenceField,
  UrlField,
  NumberField,
  TabbedShowLayout,
  ArrayField,
  EmailField,
  Datagrid,
} from 'react-admin';
import OrderTicketDownloadLinkField from './OrderTicketsDownloadLinkField';

function EventShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="General">
          <TextField source="status" label="Status" />
          <ReferenceField
            label="Event"
            source="metadata.eventId"
            reference="events"
            linkType="show"
          >
            <TextField source="id" />
          </ReferenceField>
          <NumberField source="amount" />
          <NumberField source="currency" />
          <UrlField source="metadata.stripeReceiptUrl" />
          <OrderTicketDownloadLinkField label="Tickets PDF" />
        </Tab>
        <Tab label="Billing details">
          <EmailField source="billingDetails.email" />
          <TextField source="billingDetails.name" />
          <TextField source="billingDetails.address.city" />
          <TextField source="billingDetails.address.country" />
          <TextField source="billingDetails.address.line1" />
          <TextField source="billingDetails.address.line2" />
          <TextField source="billingDetails.address.postalCode" />
          <TextField source="billingDetails.address.state" />
        </Tab>
        <Tab label="Items">
          <ArrayField source="items">
            <Datagrid>
              <TextField source="sku" />
              <NumberField source="quantity" />
              <NumberField source="price" />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

export default EventShow;
