import React from 'react';
import {
  List,
  Datagrid,
  Filter,
  TextInput,
  FormDataConsumer,
} from 'react-admin';
import PageSlugFilterUpdater from '../PageSlugFilterUpdater';
import TranslatedTextField from '../TranslatedTextField';

const VenuesArticleFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="query" alwaysOn />
      <FormDataConsumer form="filterForm" source="foo" alwaysOn>
        {({ dispatch }) => <PageSlugFilterUpdater formDispatch={dispatch} />}
      </FormDataConsumer>
      <TextInput source="pageSlug" />
    </Filter>
  );
};

function VenuesArticleList(props) {
  return (
    <List {...props} filters={<VenuesArticleFilter />}>
      <Datagrid rowClick="edit">
        <TranslatedTextField source="title" />
      </Datagrid>
    </List>
  );
}

export default VenuesArticleList;
