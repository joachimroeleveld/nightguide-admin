import React, { useState } from 'react';
import { TextField, FormDataConsumer } from 'react-admin';
import moment from 'moment';
import _ from 'lodash';
import { useForm } from 'react-final-form';

const EventDateRepeater = () => {
  const form = useForm();

  const [date, setDate] = useState(null);

  const onDateSet = e => {
    setDate(e.target.value);
  };

  const onApply = (e, formData = {}) => {
    e.preventDefault();

    const dateData = _.get(formData, 'dates[0]') || {};
    if (!dateData || !dateData.from || !dateData.to) {
      return alert('Please fill in the first date');
    }
    const numberOfDates = moment(date).diff(dateData.from, 'weeks');
    const addedDates = _.range(1, numberOfDates + 1).map(i => ({
      ...dateData,
      from: moment(dateData.from)
        .add(i, 'week')
        .toISOString(),
      to: moment(dateData.to)
        .add(i, 'week')
        .toISOString(),
    }));
    const dates = (formData.dates || []).concat(addedDates);
    form.change('dates', dates);
  };

  return (
    <div>
      <span>Repeat until </span>
      <input type="date" onChange={onDateSet} />
      <FormDataConsumer>
        {({ formData }) => (
          <button onClick={e => onApply(e, formData)}>Apply</button>
        )}
      </FormDataConsumer>
    </div>
  );
};

EventDateRepeater.propTypes = TextField.propTypes;

export default EventDateRepeater;
