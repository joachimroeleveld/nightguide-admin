import React from 'react';
import {
  List,
  Datagrid,
  Filter,
  TextInput,
  FormDataConsumer,
  TextField,
} from 'react-admin';
import PageSlugFilterUpdater from '../PageSlugFilterUpdater';
import TranslatedTextField from '../TranslatedTextField';

const VenuesArticleFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="query" alwaysOn />
      <FormDataConsumer alwaysOn>
        {() => <PageSlugFilterUpdater />}
      </FormDataConsumer>
      <TextInput source="pageSlug" />
    </Filter>
  );
};

function VenuesArticleList(props) {
  return (
    <List {...props} filters={<VenuesArticleFilter />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TranslatedTextField source="title" />
      </Datagrid>
    </List>
  );
}

export default VenuesArticleList;
