import React, { useState } from 'react';
import { TextField, FormDataConsumer } from 'react-admin';
import moment from 'moment';
import { change } from 'redux-form';
import { REDUX_FORM_NAME } from 'react-admin';
import { connect } from 'react-redux';
import _ from 'lodash';

const EventDateRepeater = props => {
  const { dispatch, } = props;

  const [date, setDate] = useState(null);
  const [dow, setDow] = useState(1);

  const onDateSet = e => {
    setDate(e.target.value);
  };

  const onDaySelect = e => {
    setDow(parseInt(e.target.value) - 1);
  };

  const onApply = (formData = {}) => {
    const numberOfDates = moment()
      .day(dow)
      .diff(moment(date), 'weeks');
    const dateData = _.get(formData, 'dates[0]') || {};
    const addedDates = _.range(1, numberOfDates + 1)
      .map(i => ({
        ...dateData,
        from: moment()
          .day(dow)
          .add(i, 'week'),
        to: moment()
          .day(dow)
          .add(i, 'week')
          .add(1, 'hour'),
      }))
      .reverse();
    const dates = (formData.dates || []).concat(addedDates);
    dispatch(change(REDUX_FORM_NAME, 'dates', dates));
  };

  return (
    <div>
      <span>Repeat every </span>
      <select onChange={onDaySelect}>
        {_.range(1, 8).map(i => (
          <option key={i} value={i}>
            {moment()
              .weekday(i)
              .format('dddd')}
          </option>
        ))}
      </select>
      <span> until </span>
      <input type="date" onChange={onDateSet} />
      <FormDataConsumer>
        {({ formData }) => (
          <button onClick={() => onApply(formData)}>Apply</button>
        )}
      </FormDataConsumer>
    </div>
  );
};

EventDateRepeater.propTypes = TextField.propTypes;

export default connect()(EventDateRepeater);
