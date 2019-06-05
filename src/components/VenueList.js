import React from 'react';
import { List, Datagrid, TextField, Filter, TextInput } from 'react-admin';

const VenueFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="query" alwaysOn />
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
