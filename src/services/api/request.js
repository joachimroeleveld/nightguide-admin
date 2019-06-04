import { stringify } from 'query-string';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export default async (path, opts = {}) => {
  let {
    id,
    query = {},
    fields,
    method = 'GET',
    body,
    headers = {},
    pagination,
    json = true,
  } = opts;

  if (pagination) {
    const { page, perPage } = pagination;
    query.offset = (page - 1) * perPage;
    query.limit = perPage;
  }

  const querystring = stringify({
    ...query,
    fields,
  });

  headers = new Headers({
    'x-api-key': API_KEY,
    Accept: 'application/json',
    ...headers,
  });

  if (json) {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(body);
  }

  const token = localStorage.getItem('token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let url = `${API_URL}${path}`;
  if (querystring) {
    url += '?' + querystring;
  }
  const response = await fetch(url, { headers, method, body });
  if (!response.ok) {
    throw new Error(`Unexpected HTTP status: ${response.status}`);
  }

  const resBody = await response.json();

  let data = {};
  if (resBody.results) {
    data.data = resBody.results;
    if (resBody.totalCount !== undefined) {
      data.total = resBody.totalCount;
    }
  } else {
    if (method === 'DELETE') {
      data.data = { id };
    } else {
      data.data = resBody;
    }
  }

  return data;
};
