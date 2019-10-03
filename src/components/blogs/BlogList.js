import React from 'react';
import { List, Datagrid, Filter, TextInput } from 'react-admin';

import TranslatedTextField from '../TranslatedTextField';

const BlogFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="query" alwaysOn />
    </Filter>
  );
};

function BlogList(props) {
  return (
    <List {...props} filters={<BlogFilter />}>
      <Datagrid rowClick="edit">
        <TranslatedTextField source="title" />
      </Datagrid>
    </List>
  );
}

export default BlogList;
