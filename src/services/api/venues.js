import {
  GET_LIST,
  GET_ONE,
  UPDATE,
  DELETE,
  GET_MANY,
  CREATE,
} from 'react-admin';

import request from './request';
import { updateImages } from './util';

export const GENERATE_TICKET_CODES = 'GENERATE_TICKET_CODES';

export default async (type, params) => {
  switch (type) {
    case GET_LIST: {
      return getList(params);
    }
    case CREATE: {
      const { data } = params;
      const { images, ...body } = data;

      const res = await request(`/venues`, { method: 'POST', body });
      await updateImages('venues', res.data.id, 'images', params);
      return res;
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
      const { images, ...body } = data;

      await updateImages('venues', id, 'images', params);
      return request(`/venues/${id}`, { body, method: 'PUT' });
    }
    case DELETE: {
      const { id } = params;
      return request(`/venues/${id}`, { method: 'DELETE', id });
    }
    case GENERATE_TICKET_CODES: {
      const { id } = params;
      return request(`/venues/${id}/generate-ticket-codes`, { method: 'POST' });
    }
  }
};

function getList(opts) {
  const { pagination, filter = {}, ids } = opts;
  const { q, ...otherFilters } = filter;

  return request('/venues', {
    pagination,
    fields: ['images', 'name'],
    query: {
      query: q ? q : undefined,
      ids,
      ...otherFilters,
      populate: ['images'],
    },
  });
}
