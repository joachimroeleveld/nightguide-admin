import React, { Component } from 'react';
import { addField } from 'ra-core';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { JsonEditor as Editor } from 'jsoneditor-react';

import 'jsoneditor-react/es/editor.min.css';

const styles = {};

class JsonEditor extends Component {
  static propTypes = {
    input: PropTypes.object,
    source: PropTypes.string,
    format: PropTypes.func,
    parse: PropTypes.func,
    ...Editor.propTypes,
  };

  static defaultProps = {
    format: val => val,
    parse: val => val,
  };

  constructor(props) {
    super(props);

    const {
      input: { value },
      format,
    } = this.props;

    this.state = {
      value: format(value),
    };
  }

  handleValueChange(value) {
    this.setState({ value });
    this.props.input.onChange(this.props.parse(value));
  }

  render() {
    return (
      <FormControl fullWidth={true} className="ra-input-jsoneditor">
        <Editor
          value={this.state.value}
          onChange={val => this.handleValueChange(val)}
          allowedModes={this.props.allowedModes}
          mode={this.props.mode}
        />
      </FormControl>
    );
  }
}

const JsonEditorWithField = addField(withStyles(styles)(JsonEditor));

JsonEditorWithField.defaultProps = {
  addLabel: true,
  fullWidth: true,
};

export default JsonEditorWithField;
