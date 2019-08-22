import React, { useState } from 'react';
import moment from 'moment';
import _ from 'lodash';

const EventDates = ({ source, record = {}, toShow = 3 }) => {
  let dates = _.get(record, source);

  const [showDates, setShowDates] = useState(false);

  if (!dates) return null;

  if (dates.from) {
    dates = [dates];
  }

  const momentFrom = moment(dates[0].from);
  const momentTo = dates[0].to && moment(dates[0].to);

  if (dates && dates.length) {
    const sameDay =
      momentTo &&
      (momentFrom.isSame(momentTo, 'day') ||
        (momentTo.isSame(moment(dates[0].from).add(1, 'day'), 'day') &&
          momentTo.isBefore(
            moment(dates[0].to)
              .add(1, 'day')
              .set({ hour: 12, minute: 0 })
          )));
    const datesToShow = dates.slice(
      0,
      toShow ? (showDates ? dates.length : toShow) : dates.length
    );

    return (
      <div>
        {datesToShow.map((date, index) => (
          <div key={index}>
            {sameDay && (
              <div>
                <span>{moment(date.from).format('ddd D MMM')}</span>
                {', '}
                <span>{moment(date.from).format('HH:mm')}</span>
                {' - '}
                <span>{moment(date.to).format('HH:mm')}</span>
              </div>
            )}
            {!sameDay && (
              <div>
                <span>{moment(date.from).format('ddd D MMM HH:mm')}</span>
                {' - '}
                <span>{moment(date.to).format('ddd D MMM HH:mm')}</span>
              </div>
            )}
          </div>
        ))}
        {datesToShow.length !== dates.length && (
          <a
            onClick={() => setShowDates(!showDates)}
            style={{ color: 'grey', textDecoration: 'underline' }}
          >{`+${dates.length} more`}</a>
        )}
      </div>
    );
  }
};

EventDates.defaultProps = {
  addLabel: true,
};

export default EventDates;
