import _ from 'lodash';

const defaultState = {
  cityConfig: {},
  city: null,
  country: null,
};

export const SET_CITY = 'SET_CITY';
export const SET_CITY_CONFIG = 'SET_CITY_CONFIG';

export const setCityConfig = payload => ({
  type: SET_CITY_CONFIG,
  payload,
});

export const setCity = payload => ({
  type: SET_CITY,
  payload,
});

export default (previousState = defaultState, { type, payload }) => {
  if (type === 'SET_CITY') {
    const country = _.findKey(previousState.cityConfig, val => val[payload]);
    return {
      ...previousState,
      city: payload,
      country,
    };
  }
  if (type === 'SET_CITY_CONFIG') {
    return {
      ...previousState,
      cityConfig: payload,
    };
  }
  return previousState;
};
