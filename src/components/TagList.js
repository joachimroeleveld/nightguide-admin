import React from 'react'
import { List, Datagrid, TextField} from 'react-admin';

function TagList(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
      </Datagrid>
    </List>
  )
}

export default TagList;
