import React from 'react';
import {
  Create,
  TabbedForm,
  FormTab,
  ArrayInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  SelectInput,
  ImageInput,
} from 'react-admin';
import { connect } from 'react-redux';

import TranslatedTextInput from '../TranslatedTextInput';
import FormAccordion from '../FormAccordion';
import { getPageSlugs } from '../../state/cities';
import GoogleImage from '../GoogleImage';

function VenuesArticleCreate(props) {
  const { pageSlug, pageSlugs, ...otherProps } = props;
  return (
    <Create {...otherProps}>
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
          <TranslatedTextInput
            validate={required()}
            source="title"
            label="Title"
          />
          <TranslatedTextInput
            validate={required()}
            source="intro"
            label="Intro text"
            rich={true}
            inputProps={{ minEditorHeight: 60, commands: [] }}
          />
        </FormTab>
        <FormTab label="Venues">
          <ArrayInput
            validate={required()}
            source="venues"
            style={{ width: '100%' }}
          >
            <FormAccordion>
              <ReferenceInput
                validate={required()}
                label="Venue"
                source="venueId"
                reference="venues"
                filter={{ pageSlug }}
              >
                <AutocompleteInput optionText="name" />
              </ReferenceInput>
              <TranslatedTextInput
                validate={required()}
                source="tagLine"
                label="Tag line"
              />
              <TranslatedTextInput
                validate={required()}
                source="body"
                label="Body"
                rich={true}
              />
            </FormAccordion>
          </ArrayInput>
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
}))(VenuesArticleCreate);
