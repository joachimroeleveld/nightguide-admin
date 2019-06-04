import React from 'react';
import moment from 'moment';
import _ from 'lodash';

const EventDates = ({ source, record = {}, items = 3 }) => {
  const dates = _.get(record, source);
  if (dates && dates.length) {
    const sameDay = moment(dates[0].from).isSame(dates[0].to, 'day');
    const datesToShow = dates.slice(0, items ? items : dates.length);

    return (
      <div>
        {datesToShow.map((date, index) => (
          <date key={index}>
            {sameDay && (
              <div>
                <span>{moment(date.from).format('ddd D MMM')}</span>
                {' | '}
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
          </date>
        ))}
        {datesToShow.length !== dates.length && (
          <span style={{ color: 'grey' }}>{`+${dates.length} more`}</span>
        )}
      </div>
    );
  }
};

EventDates.defaultProps = {
  addLabel: true,
};

export default EventDates;
