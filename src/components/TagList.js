import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

import { __src } from '../services/i18n';

function TagList(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source={__src('name')} />
      </Datagrid>
    </List>
  );
}

export default TagList;
