import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Filter,
  TextInput,
  FormDataConsumer,
} from 'react-admin';

import CityFilterUpdater from './CityFilterUpdater';

const VenueFilter = props => (
  <Filter {...props}>
    <FormDataConsumer form="filterForm" source="foo" alwaysOn>
      {({ dispatch }) => <CityFilterUpdater formDispatch={dispatch} />}
    </FormDataConsumer>
    <TextInput label="Search" source="query" alwaysOn />
    <TextInput label="City" source="location.city" />
    <TextInput label="Country" source="location.country" />
  </Filter>
);

function VenueList(props) {
  return (
    <List {...props} filters={<VenueFilter />}>
      <Datagrid rowClick="show">
        <TextField source="name" />
      </Datagrid>
    </List>
  );
}

export default VenueList;
