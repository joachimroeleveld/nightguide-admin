import React, { Fragment } from 'react';
import { SelectInput, FormDataConsumer, TextInput } from 'react-admin';

import ticketProviders from './ticket-providers';

function EventTicketProviderFields(props) {
  const { record = {} } = props;
  const { tickets = {} } = record;

  return (
    <Fragment>
      <SelectInput
        {...props}
        source={'tickets.provider'}
        label={'Provider'}
        choices={ticketProviders}
      />
      <div>
        <FormDataConsumer>
          {({ formData, ...rest }) => {
            const { tickets = {} } = formData || {};
            switch (tickets.provider) {
              case 'eventix':
                return (
                  <TextInput
                    label="Shop ID"
                    source="tickets.providerData.shopId"
                    {...props}
                  />
                );
              case 'gaygo':
                return (
                  <TextInput
                    label="Promotor ID"
                    source="tickets.providerData.promotorId"
                    {...props}
                  />
                );
              case 'exceed':
                return (
                  <TextInput
                    label="List ID"
                    source="tickets.providerData.list"
                    {...props}
                  />
                );
              case 'eventbrite':
                return (
                  <Fragment>
                    <div>
                      <TextInput
                        label="Affiliate partner ID"
                        source="tickets.providerData.partnerId"
                        {...props}
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Affiliate program name"
                        source="tickets.providerData.programName"
                        {...props}
                      />
                    </div>
                  </Fragment>
                );
              default:
                return null;
            }
          }}
        </FormDataConsumer>
      </div>
    </Fragment>
  );
}

export default EventTicketProviderFields;
