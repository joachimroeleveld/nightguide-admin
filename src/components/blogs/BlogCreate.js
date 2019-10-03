import React from 'react';
import { Create, SelectInput, TabbedForm, FormTab, ImageInput, required } from 'react-admin';
import { connect } from 'react-redux';

import TranslatedTextInput from '../TranslatedTextInput';
import GoogleImage from '../GoogleImage';
import { getPageSlugs } from '../../state/cities';

function BlogCreate(props) {
  const { pageSlug, pageSlugs, ...otherProps } = props;
  return (
    <Create {...props}>
      <TabbedForm redirect="list">
        <FormTab label="General">
          <SelectInput
            validate={required()}
            source="pageSlug"
            defaultValue={pageSlug}
            choices={pageSlugs.map(slug => ({
              id: slug,
              name: slug,
            }))}
          />
          <TranslatedTextInput source="title" validate={required()} />
          <TranslatedTextInput
            source="intro"
            label="Intro text"
            rich={true}
            inputProps={{ minEditorHeight: 60 }}
          />
          <TranslatedTextInput
            rich={true}
            source="body"
            validate={required()}
          />
        </FormTab>
        <FormTab label="Media">
          <ImageInput
            source="images"
            accept="image/*"
            maxSize={5000000} // 5MB
            multiple
          >
            <GoogleImage source="url" size={230} />
          </ImageInput>
        </FormTab>
      </TabbedForm>
    </Create>
  );
}

export default connect(state => ({
  pageSlug: state.cities.pageSlug,
  pageSlugs: getPageSlugs(state),
}))(BlogCreate);
