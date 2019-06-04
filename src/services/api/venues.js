import { GET_LIST, GET_ONE, UPDATE, DELETE, GET_MANY } from 'react-admin';

import request from './request';

export default (type, params) => {
  switch (type) {
    case GET_LIST: {
      const { pagination } = params;
      return request('/venues', { pagination });
    }
    case GET_ONE: {
      const { id } = params;
      return request(`/venues/${id}`);
    }
    case GET_MANY: {
      const { ids } = params;
      return request(`/venues`, { query: { ids: ids.join(',') } });
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
