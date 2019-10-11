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

const BlogFilter = props => {
  return (
    <Filter {...props}>
      <FormDataConsumer form="filterForm" source="foo" alwaysOn>
        {({ dispatch }) => <PageSlugFilterUpdater formDispatch={dispatch} />}
      </FormDataConsumer>
      <TextInput label="Search" source="query" alwaysOn />
    </Filter>
  );
};

function BlogList(props) {
  return (
    <List {...props} filters={<BlogFilter />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TranslatedTextField source="title" />
      </Datagrid>
    </List>
  );
}

export default BlogList;
