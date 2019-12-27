const defaultState = {
  cityConfig: {},
  pageSlug: null,
};

export const SET_PAGE_SLUG = 'SET_PAGE_SLUG';
export const SET_CITY_CONFIG = 'SET_CITY_CONFIG';

export const getPageSlug = state => state.cities.pageSlug;

export const getPageSlugs = state => Object.keys(state.cities.cityConfig);

export const setCityConfig = payload => ({
  type: SET_CITY_CONFIG,
  payload,
});

export const setPageSlug = payload => ({
  type: SET_PAGE_SLUG,
  payload,
});

export default (previousState = defaultState, { type, payload }) => {
  if (type === 'SET_PAGE_SLUG') {
    return {
      ...previousState,
      pageSlug: payload,
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
