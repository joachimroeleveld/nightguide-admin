import request from './request';
import _ from 'lodash';

export async function updateImages(
  resource,
  resourceId,
  imageField,
  params,
  formFieldName = 'images'
) {
  const { data, previousData = {} } = params;
  const newData = data[imageField] || [];
  const oldData = previousData[imageField];

  const deletedImageIds =
    oldData &&
    oldData.map(img => img.id).filter(imgId => !_.find(newData, { id: imgId }));

  const buffers = newData.map(img => img.rawFile).filter(img => !!img);

  if (buffers.length) {
    const createBody = new FormData();
    buffers.forEach(file => createBody.append(formFieldName, file));
    await request(`/${resource}/${resourceId}/images`, {
      method: 'POST',
      body: createBody,
      json: false,
    });
  }
  if (deletedImageIds) {
    for (const imgId of deletedImageIds) {
      await request(`/${resource}/${resourceId}/images/${imgId}`, {
        method: 'DELETE',
      });
    }
  }
}
