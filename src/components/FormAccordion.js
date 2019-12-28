import React, {
  Children,
  cloneElement,
  Component,
  isValidElement,
} from 'react';
import PropTypes from 'prop-types';
import { FormInput } from 'react-admin';
import compose from 'recompose/compose';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles, createStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { translate } from 'ra-core';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';

const styles = theme =>
  createStyles({
    root: {
      width: '100%',
      padding: 0,
      marginBottom: 0,
      '& > li:last-child': {
        borderBottom: 'none',
      },
    },
    line: {
      display: 'flex',
      listStyleType: 'none',
      borderBottom: `solid 1px ${theme.palette.divider}`,
      [theme.breakpoints.down('xs')]: { display: 'block' },
      '&.fade-enter': {
        opacity: 0.01,
        transform: 'translateX(100vw)',
      },
      '&.fade-enter-active': {
        opacity: 1,
        transform: 'translateX(0)',
        transition: 'all 500ms ease-in',
      },
      '&.fade-exit': {
        opacity: 1,
        transform: 'translateX(0)',
      },
      '&.fade-exit-active': {
        opacity: 0.01,
        transform: 'translateX(100vw)',
        transition: 'all 500ms ease-in',
      },
    },
    index: {
      paddingTop: '1em',
      [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    form: { flex: 2 },
    action: {
      paddingTop: '0.5em',
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
  });

export class FormAccordion extends Component {
  constructor(props) {
    super(props);
    // we need a unique id for each field for a proper enter/exit animation
    // but redux-form doesn't provide one (cf https://github.com/erikras/redux-form/issues/2735)
    // so we keep an internal map between the field position and an autoincrement id
    const nextId = props.fields.length
      ? props.fields.length
      : props.defaultValue
      ? props.defaultValue.length
      : 0;

    // We check whether we have a defaultValue (which must be an array) before checking
    // the fields prop which will always be empty for a new record.
    // Without it, our ids wouldn't match the default value and we would get key warnings
    // on the CssTransition element inside our render method
    const ids = nextId > 0 ? Array.from(Array(nextId).keys()) : [];

    this.state = {
      expanded: ids.length === 1 ? ids[0] : false,
      nextId,
      ids,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.ids.length < props.fields.length) {
      const addedIdsCount = props.fields.length - state.ids.length;
      return {
        nextId: state.nextId + addedIdsCount,
        ids: [
          ...state.ids,
          ..._.range(state.nextId, state.nextId + addedIdsCount),
        ],
      };
    }
    return null;
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({
      expanded: isExpanded ? panel : false,
    });
  };

  removeField = index => () => {
    const { fields } = this.props;
    this.setState({
      ids: [
        ...this.state.ids.slice(0, index),
        ...this.state.ids.slice(index + 1),
      ],
    });
    fields.remove(index);
  };

  // Returns a boolean to indicate whether to disable the remove button for certain fields.
  // If disableRemove is a function, then call the function with the current record to
  // determing if the button should be disabled. Otherwise, use a boolean property that
  // enables or disables the button for all of the fields.
  disableRemoveField = (record, disableRemove) => {
    if (typeof disableRemove === 'boolean') {
      return disableRemove;
    }
    return disableRemove && disableRemove(record);
  };

  addField = () => {
    const { fields } = this.props;
    this.setState({
      nextId: this.state.nextId + 1,
      ids: this.state.ids.concat(this.state.nextId),
    });
    fields.push({});
  };

  render() {
    const {
      basePath,
      classes = {},
      children,
      fields,
      meta: { error, submitFailed },
      record,
      resource,
      source,
      translate,
      disableAdd = false,
      disableRemove = false,
      LabelComponent = () => 'NEW',
    } = this.props;
    const records = get(record, source);
    return fields ? (
      <div className={classes.root}>
        {submitFailed && error && (
          <FormHelperText error>{error}</FormHelperText>
        )}
        <TransitionGroup>
          {fields.map((member, index) => (
            <CSSTransition
              key={this.state.ids[index]}
              timeout={500}
              classNames="fade"
            >
              <ExpansionPanel
                expanded={this.state.expanded === this.state.ids[index]}
                onChange={this.handleChange(this.state.ids[index])}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="body1" className={classes.index}>
                    <LabelComponent
                      record={(records && records[index])}
                    />
                  </Typography>
                </ExpansionPanelSummary>
                {this.state.expanded === this.state.ids[index] && (
                  <ExpansionPanelDetails>
                    <section className={classes.form}>
                      {Children.map(children, (input, index2) =>
                        isValidElement(input) ? (
                          <FormInput
                            basePath={input.props.basePath || basePath}
                            input={cloneElement(input, {
                              source: input.props.source
                                ? `${member}.${input.props.source}`
                                : member,
                              index: input.props.source ? undefined : index2,
                              label: input.props.label || input.props.source,
                            })}
                            record={(records && records[index]) || {}}
                            resource={resource}
                          />
                        ) : null
                      )}
                    </section>
                  </ExpansionPanelDetails>
                )}
                {!this.disableRemoveField(
                  (records && records[index]) || {},
                  disableRemove
                ) && (
                  <span className={classes.action}>
                    <Button
                      className={classNames(
                        'button-remove',
                        `button-remove-${source}-${index}`
                      )}
                      size="small"
                      onClick={this.removeField(index)}
                    >
                      <CloseIcon className={classes.leftIcon} />
                      {translate('ra.action.remove')}
                    </Button>
                  </span>
                )}
              </ExpansionPanel>
            </CSSTransition>
          ))}
        </TransitionGroup>
        {!disableAdd && (
          <li className={classes.line}>
            <span className={classes.action}>
              <Button
                className={classNames('button-add', `button-add-${source}`)}
                size="small"
                onClick={this.addField}
              >
                <AddIcon className={classes.leftIcon} />
                {translate('ra.action.add')}
              </Button>
            </span>
          </li>
        )}
      </div>
    ) : null;
  }
}

const FormAccordionField = compose(
  translate,
  withStyles(styles)
)(FormAccordion);

FormAccordionField.propTypes = {
  initialValues: PropTypes.any,
  basePath: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  fields: PropTypes.object,
  meta: PropTypes.object,
  record: PropTypes.object,
  source: PropTypes.string,
  resource: PropTypes.string,
  translate: PropTypes.func,
  disableAdd: PropTypes.bool,
  disableRemove: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  LabelComponent: PropTypes.elem,
};

export default FormAccordionField;
