import { useEffect } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';

const CityFilterUpdater = props => {
  const { city, country, formDispatch } = props;

  useEffect(() => {
    formDispatch(
      change('filterForm', 'location.city', city === 'none' ? null : city)
    );
    formDispatch(
      change(
        'filterForm',
        'location.country',
        country === 'none' ? null : country
      )
    );
  }, [city, country]);

  return null;
};

export default connect(state => ({
  city: state.cities.city,
  country: state.cities.country,
}))(CityFilterUpdater);
