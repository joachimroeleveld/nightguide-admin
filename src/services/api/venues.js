import { GET_LIST, GET_ONE, UPDATE, DELETE, GET_MANY } from 'react-admin';

import request from './request';

export default (type, params) => {
  switch (type) {
    case GET_LIST: {
      return getList(params);
    }
    case GET_ONE: {
      const { id, query = {} } = params;
      query.populate = ['images'];
      return request(`/venues/${id}`, { query });
    }
    case GET_MANY: {
      return getList(params);
    }
    case UPDATE: {
      const { id, data } = params;
      return request(`/venues/${id}`, { body: data, method: 'PUT' });
    }
    case DELETE: {
      const { id } = params;
      return request(`/venues/${id}`, { method: 'DELETE', id });
    }
  }
};

function getList(opts) {
  const { pagination, filter = {}, ids } = opts;

  return request('/venues', {
    pagination,
    fields: ['images', 'name'],
    query: {
      ids,
      ...filter,
      populate: ['images'],
    },
  });
}
