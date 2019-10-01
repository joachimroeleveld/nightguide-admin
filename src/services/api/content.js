import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  GET_MANY,
} from 'react-admin';

import request from './request';
import { updateImages } from './util';

export default contentType => async (type, params) => {
  switch (type) {
    case GET_LIST: {
      return getList(contentType, params);
    }
    case CREATE: {
      const { data } = params;
      const { images, ...body } = data;

      const res = await request(`/content`, {
        method: 'POST',
        body: {
          ...body,
          type: contentType,
        },
      });
      await updateImages('content', res.data.id, 'images', params);
      return res;
    }
    case GET_ONE: {
      const { id } = params;
      return request(`/content/${id}`);
    }
    case UPDATE: {
      const { id, data } = params;
      const { images, ...body } = data;

      await updateImages('content', id, 'images', params);
      return request(`/content/${id}`, { body, method: 'PUT' });
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
      populate: ['images'],
    },
  });
}
