import React from 'react';
import {
  ImageInput,
  Edit,
  TabbedForm,
  FormTab,
  required,
  TextInput,
  SelectInput,
} from 'react-admin';
import { connect } from 'react-redux';

import TranslatedTextInput from '../TranslatedTextInput';
import GoogleImage from '../GoogleImage';
import ImageSelector from '../ImageSelector';
import { getPageSlugs } from '../../state/cities';

function BlogEdit(props) {
  const { pageSlug, pageSlugs, ...otherProps } = props;
  return (
    <Edit undoable={false} {...props}>
      <TabbedForm>
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
          <TextInput source="urlSlugs.0" label="URL slug" />
          <TranslatedTextInput
            inputProps={{ minEditorHeight: 60 }}
            source="intro"
            label="Intro text"
            rich={true}
          />
          <TranslatedTextInput
            rich={true}
            source="body"
            validate={required()}
          />
        </FormTab>
        <FormTab label="Media">
          <ImageSelector source="coverImage" imagesSource="images" />
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
    </Edit>
  );
}

export default connect(state => ({
  pageSlug: state.cities.pageSlug,
  pageSlugs: getPageSlugs(state),
}))(BlogEdit);
