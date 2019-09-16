import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
} from 'react-admin';
import { connect } from 'react-redux';

import JsonEditor from '../JsonEditor';
import { getPageSlugs } from '../../state/cities';

function ConfigEdit(props) {
  const { pageSlug, pageSlugs, dispatch, ...otherProps } = props;

  return (
    <Edit undoable={false} {...props}>
      <SimpleForm>
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
          label={'JSON'}
          source="payload"
          allowedModes={['form', 'tree', 'code']}
        />
      </SimpleForm>
    </Edit>
  );
}

export default connect(state => ({
  pageSlug: state.cities.pageSlug,
  pageSlugs: getPageSlugs(state),
}))(ConfigEdit);
