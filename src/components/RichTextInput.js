import React from 'react';
import Quill from 'quill';
import styles from 'ra-input-rich-text/src/styles';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { addField } from 'ra-core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const Delta = Quill.import('delta');
const Break = Quill.import('blots/break');
const Embed = Quill.import('blots/embed');

function lineBreakMatcher() {
  var newDelta = new Delta();
  newDelta.insert({ break: '' });
  return newDelta;
}

class SmartBreak extends Break {
  length() {
    return 1;
  }
  value() {
    return '\n';
  }

  insertInto(parent, ref) {
    Embed.prototype.insertInto.call(this, parent, ref);
  }
}

SmartBreak.blotName = 'break';
SmartBreak.tagName = 'BR';

Quill.register(SmartBreak);

export class RichTextInput extends React.Component {
  lastValueChange = null;

  static propTypes = {
    addLabel: PropTypes.bool.isRequired,
    classes: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    source: PropTypes.string,
    toolbar: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.shape({
        container: PropTypes.array,
        handlers: PropTypes.object,
      }),
    ]),
    fullWidth: PropTypes.bool,
  };

  static defaultProps = {
    addLabel: true,
    options: {}, // Quill editor options
    record: {},
    toolbar: true,
    fullWidth: true,
  };

  componentDidMount() {
    const {
      input: { value },
    } = this.props;

    const options = {
      formats: [
        'bold',
        'header',
        'italic',
        'link',
        'list',
        'blockquote',
        'image',
        'indent',
      ],
      modules: {
        clipboard: {
          matchVisual: false,
          matchers: [['BR', lineBreakMatcher]],
        },
        keyboard: {
          bindings: {
            linebreak: {
              key: 13,
              shiftKey: true,
              handler: function(range) {
                let currentLeaf = this.quill.getLeaf(range.index)[0];
                let nextLeaf = this.quill.getLeaf(range.index + 1)[0];

                this.quill.insertEmbed(range.index, 'break', true, 'user');

                // Insert a second break if:
                // At the end of the editor, OR next leaf has a different parent (<p>)
                if (
                  nextLeaf === null ||
                  currentLeaf.parent !== nextLeaf.parent
                ) {
                  this.quill.insertEmbed(range.index, 'break', true, 'user');
                }

                // Now that we've inserted a line break, move the cursor forward
                this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
              },
            },
          },
        },
      },
      theme: 'snow',
    };

    this.quill = new Quill(this.divRef, options);

    this.quill.setContents(this.quill.clipboard.convert(value));

    this.editor = this.divRef.querySelector('.ql-editor');
    this.quill.on('text-change', this.onTextChange);

    const length = this.quill.getLength();
    const text = this.quill.getText(length - 2, 2);

    // Remove extraneous new lines
    if (text === '\n\n') {
      this.quill.deleteText(this.quill.getLength() - 2, 2);
    }
  }

  componentDidUpdate() {
    if (this.lastValueChange !== this.props.input.value) {
      const selection = this.quill.getSelection();
      this.quill.setContents(
        this.quill.clipboard.convert(this.props.input.value)
      );
      if (selection && this.quill.hasFocus()) {
        this.quill.setSelection(selection);
      }
    }
  }

  componentWillUnmount() {
    this.quill.off('text-change', this.onTextChange);
    this.onTextChange.cancel();
    this.quill = null;
  }

  onTextChange = debounce(() => {
    const value =
      this.editor.innerHTML === '<p><br></p>' ? '' : this.editor.innerHTML;
    this.lastValueChange = value;
    this.props.input.onChange(value);
  }, 500);

  updateDivRef = ref => {
    this.divRef = ref;
  };

  render() {
    const { touched, error, helperText = false } = this.props.meta;
    return (
      <FormControl
        error={!!(touched && error)}
        fullWidth={this.props.fullWidth}
        className="ra-rich-text-input"
      >
        <div data-testid="quill" ref={this.updateDivRef} />
        {touched && error && (
          <FormHelperText error className="ra-rich-text-input-error">
            {error}
          </FormHelperText>
        )}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
}

const RichTextInputWithField = addField(withStyles(styles)(RichTextInput));

RichTextInputWithField.defaultProps = {
  addLabel: true,
  fullWidth: true,
};
export default RichTextInputWithField;
