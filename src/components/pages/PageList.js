import React from 'react';
import {
  List,
  Datagrid,
  Filter,
  TextInput,
  TextField,
  FormDataConsumer,
} from 'react-admin';

import TranslatedTextField from '../TranslatedTextField';
import PageSlugFilterUpdater from '../PageSlugFilterUpdater';

const PageFilter = props => {
  return (
    <Filter {...props}>
      <FormDataConsumer alwaysOn>
        {() => <PageSlugFilterUpdater />}
      </FormDataConsumer>
      <TextInput label="Search" source="query" alwaysOn />
    </Filter>
  );
};

function PageList(props) {
  return (
    <List {...props} filters={<PageFilter />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TranslatedTextField source="title" />
      </Datagrid>
    </List>
  );
}

export default PageList;
