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
      return request('/artists');
    }
    case CREATE: {
      const { data } = params;
      return request(`/artists`, { method: 'POST', body: data });
    }
    case GET_ONE: {
      const { id } = params;
      return request(`/artists/${id}`);
    }
    case UPDATE: {
      const { id, data } = params;
      return request(`/artists/${id}`, { body: data, method: 'PUT' });
    }
    case DELETE: {
      const { id } = params;
      return request(`/artists/${id}`, { method: 'DELETE', id });
    }
    case GET_MANY: {
      const { ids } = params;
      return request(`/artists`, {
        query: { ids: ids.join(',') || undefined },
      });
    }
  }
};
