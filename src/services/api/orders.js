import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  GET_MANY,
} from 'react-admin';

import request from './request';

export default (type, params) => {
  switch (type) {
    case GET_LIST: {
      return getList(params);
    }
    case CREATE: {
      const { data } = params;
      return request(`/orders`, { method: 'POST', body: data });
    }
    case GET_ONE: {
      const { id } = params;
      return request(`/orders/${id}`);
    }
    case UPDATE: {
      const { id, data } = params;
      return request(`/orders/${id}`, { body: data, method: 'PUT' });
    }
    case DELETE: {
      const { id } = params;
      return request(`/orders/${id}`, { method: 'DELETE', id });
    }
    case GET_MANY: {
      return getList(params);
    }
  }
};

function getList(opts) {
  const { pagination, ids } = opts;
  const { q, ...filter } = opts.filter || {};
  return request('/orders', {
    pagination,
    query: {
      ids,
      ...filter,
    },
  });
}
