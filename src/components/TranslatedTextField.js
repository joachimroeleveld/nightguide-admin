import React from 'react';
import { TextField } from 'react-admin';
import ReactMarkdown from 'react-markdown';
import _ from 'lodash';

const TranslatedTextField = props => {
  const { source, rich = false, ...otherProps } = props;

  if (rich) {
    const val = _.get(otherProps.record, `${source}.en`);
    return <ReactMarkdown source={val} escapeHtml={false} />;
  } else {
    return <TextField {...otherProps} source={`${source}.en`} />;
  }
};

TranslatedTextField.propTypes = TextField.propTypes;
TranslatedTextField.defaultProps = {
  addLabel: true,
};

export default TranslatedTextField;
