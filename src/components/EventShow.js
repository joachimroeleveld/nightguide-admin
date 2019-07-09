import React from 'react';
import {
  ShowView,
  ShowController,
  ReferenceArrayField,
  TextField,
  SingleFieldList,
  ChipField,
  RichTextField,
  TabbedShowLayout,
  Tab,
  ArrayField,
  ReferenceField,
  UrlField,
  NumberField,
  BooleanField
} from 'react-admin';

import GoogleImage from './GoogleImage';
import FbEventUrl from './FbEventUrl';
import EventDates from './EventDates';
import { __src } from '../services/i18n';

function EventEdit(props) {
  return (
    <ShowController {...props}>
      {controllerProps => (
        <ShowView {...props} {...controllerProps}>
          <TabbedShowLayout>
            <Tab label="General">
              <TextField source="pageSlug" label="City" />
              <ReferenceField
                label="Venue"
                source="organiser.venue"
                reference="venues"
                linkType="show"
              >
                <TextField source="name" />
              </ReferenceField>
              <TextField source="title" />
              <TextField source={__src('description')} />
              <EventDates source="dates" />
              <ArrayField source="images">
                <SingleFieldList>
                  <GoogleImage source="url" size={230} />
                </SingleFieldList>
              </ArrayField>
              <ReferenceArrayField label="Tags" reference="tags" source="tags">
                <SingleFieldList>
                  <ChipField source={__src('name')} />
                </SingleFieldList>
              </ReferenceArrayField>
              <BooleanField source="admin.hide" label="Hidden" />
            </Tab>
            {!!controllerProps.record && controllerProps.record.facebook && (
              <Tab label="Facebook">
                <TextField label="ID" source="facebook.id" />
                <FbEventUrl label="Event page" source="facebook.id" />
                <TextField label="Title" source="facebook.title" />
                <RichTextField
                  label="Description"
                  source="facebook.description"
                />
              </Tab>
            )}
            <Tab label="Tickets">
              <UrlField
                label="Ticket page URL"
                source="tickets.checkoutUrl"
                type="url"
              />
              <NumberField label="From price" source="tickets.priceFrom" />
            </Tab>
            <Tab label="Video">
              <UrlField label="Video URL" source="videoUrl" type="url" />
            </Tab>
          </TabbedShowLayout>
        </ShowView>
      )}
    </ShowController>
  );
}

export default EventEdit;
