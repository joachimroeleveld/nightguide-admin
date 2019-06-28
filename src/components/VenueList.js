import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Filter,
  TextInput,
  FormDataConsumer,
} from 'react-admin';

import PageSlugFilterUpdater from './PageSlugFilterUpdater';

const VenueFilter = props => (
  <Filter {...props}>
    <FormDataConsumer form="filterForm" source="foo" alwaysOn>
      {({ dispatch }) => <PageSlugFilterUpdater formDispatch={dispatch} />}
    </FormDataConsumer>
    <TextInput label="Search" source="query" alwaysOn />
    <TextInput label="Page slug" source="pageSlug" />
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
