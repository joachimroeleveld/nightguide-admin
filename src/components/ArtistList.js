import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

function ArtistList(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="name" />
      </Datagrid>
    </List>
  );
}

export default ArtistList;
