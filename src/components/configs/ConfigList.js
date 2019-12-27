import React from 'react';
import {
  List,
  FormDataConsumer,
  Datagrid,
  TextField,
  Filter,
  TextInput,
} from 'react-admin';

import PageSlugFilterUpdater from '../PageSlugFilterUpdater';

const ConfigFilter = props => {
  return (
    <Filter {...props}>
      <FormDataConsumer alwaysOn>
        {() => <PageSlugFilterUpdater />}
      </FormDataConsumer>
      <TextInput label="Search" source="query" alwaysOn />
      <TextInput label="Page slug" source="pageSlug" />
    </Filter>
  );
};

function ConfigList(props) {
  return (
    <List {...props} filters={<ConfigFilter />}>
      <Datagrid rowClick="edit">
        <TextField source="pageSlug" />
        <TextField source="name" />
      </Datagrid>
    </List>
  );
}

export default ConfigList;
