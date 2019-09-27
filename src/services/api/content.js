import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  GET_MANY,
} from 'react-admin';

import request from './request';

export default contentType => (type, params) => {
  switch (type) {
    case GET_LIST: {
      return getList(contentType, params);
    }
    case CREATE: {
      const { data } = params;
      return request(`/content`, {
        method: 'POST',
        body: {
          ...data,
          type,
        },
      });
    }
    case GET_ONE: {
      const { id } = params;
      return request(`/content/${id}`);
    }
    case UPDATE: {
      const { id, data } = params;
      return request(`/content/${id}`, {
        body: data,
        method: 'PUT',
      });
    }
    case DELETE: {
      const { id } = params;
      return request(`/content/${id}`, { method: 'DELETE', id });
    }
    case GET_MANY: {
      return getList(contentType, params);
    }
  }
};

function getList(contentType, opts) {
  const { pagination, filter = {}, ids } = opts;
  return request(`/content`, {
    pagination,
    query: {
      ids,
      type: contentType,
      ...filter,
    },
  });
}
