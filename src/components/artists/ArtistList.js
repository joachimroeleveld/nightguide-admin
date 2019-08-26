import React from 'react';
import { List, Datagrid, TextField, Filter, TextInput } from 'react-admin';

const ArtistFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="query" alwaysOn />
    </Filter>
  );
};

function ArtistList(props) {
  return (
    <List {...props} filters={<ArtistFilter />}>
      <Datagrid rowClick="edit">
        <TextField source="name" />
      </Datagrid>
    </List>
  );
}

export default ArtistList;
