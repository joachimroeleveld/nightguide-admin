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
                  <Fragment>
                    <TextInput
                      label="Shop ID"
                      source="tickets.providerData.shopId"
                      {...props}
                    />
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
