import { GET_LIST, GET_ONE, UPDATE, DELETE, GET_MANY } from 'react-admin';

import request from './request';

export default (type, params) => {
  switch (type) {
    case GET_LIST: {
      const { pagination, filter = {} } = params;
      return request('/venues', {
        pagination,
        query: {
          ...filter,
        },
      });
    }
    case GET_ONE: {
      const { id, query = {} } = params;
      query.populate = ['images'];
      return request(`/venues/${id}`, { query });
    }
    case GET_MANY: {
      const { ids } = params;
      return request(`/venues`, { query: { ids: ids.join(',') || undefined } });
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
