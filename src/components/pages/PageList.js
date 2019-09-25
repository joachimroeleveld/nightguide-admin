import React from 'react';
import { List, Datagrid, Filter, TextInput } from 'react-admin';

import TranslatedTextField from '../TranslatedTextField';

const PageFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="query" alwaysOn />
    </Filter>
  );
};

function PageList(props) {
  return (
    <List {...props} filters={<PageFilter />}>
      <Datagrid rowClick="edit">
        <TranslatedTextField source="title" />
      </Datagrid>
    </List>
  );
}

export default PageList;
