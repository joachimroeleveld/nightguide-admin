import React from 'react';
import {
  Edit,
  TextField,
  TabbedForm,
  FormTab,
  TextInput,
  BooleanInput,
  SelectInput,
  NumberInput,
  ImageInput,
  required,
  regex,
} from 'react-admin';
import { connect } from 'react-redux';

import TranslatedTextInput from '../TranslatedTextInput';
import { getPageSlugs } from '../../state/cities';
import GoogleImage from '../GoogleImage';

function VenueEdit(props) {
  const { pageSlug, pageSlugs, dispatch, ...otherProps } = props;

  return (
    <Edit undoable={false} {...props}>
      <TabbedForm redirect="list">
        <FormTab label="General">
          <TextField source="id" />
          <SelectInput
            validate={required()}
            source="pageSlug"
            defaultValue={pageSlug}
            choices={pageSlugs.map(slug => ({
              id: slug,
              name: slug,
            }))}
          />
          <TextInput source="name" validate={required()} />
          <TranslatedTextInput
            rich={true}
            source="description"
            label="Description"
          />
          <BooleanInput source="admin.hide" label="Hide" />
        </FormTab>
        <FormTab label="Location">
          <TextInput source="location.address1" validate={required()} />
          <TextInput source="location.address2" />
          <TextInput source="location.postalCode" validate={required()} />
          <TextInput source="location.city" validate={required()} />
          <TextInput
            source="location.country"
            label={'Country code'}
            validate={[required()]}
          />
          <NumberInput
            source="location.coordinates.longitude"
            validate={[
              required(),
              regex(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/),
            ]}
            parse={input => parseFloat(input)}
          />
          <NumberInput
            source="location.coordinates.latitude"
            validate={[
              required(),
              regex(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/),
            ]}
            parse={input => parseFloat(input)}
          />
          <TextInput source="location.googlePlaceId" />
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
    </Edit>
  );
}

export default connect(state => ({
  pageSlug: state.cities.pageSlug,
  pageSlugs: getPageSlugs(state),
}))(VenueEdit);
