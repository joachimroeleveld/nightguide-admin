import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
} from 'react-admin';
import { connect } from 'react-redux';

import { getPageSlugs } from '../../state/cities';
import JsonEditor from '../JsonEditor';

function ConfigCreate(props) {
  const { pageSlug, pageSlugs, dispatch, ...otherProps } = props;

  return (
    <Create {...props}>
      <SimpleForm redirect="list">
        <TextInput source="name" validate={required()} />
        <SelectInput
          source="pageSlug"
          defaultValue={pageSlug}
          choices={pageSlugs.map(slug => ({
            id: slug,
            name: slug,
          }))}
        />
        <JsonEditor
          label="JSON"
          source="payload"
          allowedModes={['form', 'tree', 'code']}
        />
      </SimpleForm>
    </Create>
  );
}

export default connect(state => ({
  pageSlug: state.cities.pageSlug,
  pageSlugs: getPageSlugs(state),
}))(ConfigCreate);
