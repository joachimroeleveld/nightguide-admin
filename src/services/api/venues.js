import {
  GET_LIST,
  GET_ONE,
  UPDATE,
  DELETE,
  GET_MANY,
  CREATE,
} from 'react-admin';

import request from './request';
import _ from 'lodash';

export default async (type, params) => {
  switch (type) {
    case GET_LIST: {
      return getList(params);
    }
    case CREATE: {
      const { data } = params;
      const { images, ...body } = data;
      const res = await request(`/venues`, { method: 'POST', body });
      const imageData = images.map(img => img.rawFile).filter(img => !!img);
      await updateImages(res.data.id, imageData);
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
      const { id, data, previousData } = params;
      const { images, ...body } = data;

      const deletedImages = previousData.images
        .map(img => img.id)
        .filter(imgId => !_.find(images, { id: imgId }));
      const newImages = images.map(img => img.rawFile).filter(img => !!img);
      await updateImages(id, newImages, deletedImages);

      return request(`/venues/${id}`, { body, method: 'PUT' });
    }
    case DELETE: {
      const { id } = params;
      return request(`/venues/${id}`, { method: 'DELETE', id });
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

async function updateImages(eventId, toCreate = [], toDelete = []) {
  if (toCreate.length) {
    const createBody = new FormData();
    toCreate.forEach(file => createBody.append('images', file));
    await request(`/venues/${eventId}/images`, {
      method: 'POST',
      body: createBody,
      json: false,
    });
  }
  if (toDelete.length) {
    for (const imgId of toDelete) {
      await request(`/venues/${eventId}/images/${imgId}`, {
        method: 'DELETE',
      });
    }
  }
}
