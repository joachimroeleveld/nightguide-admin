import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK } from 'react-admin';
import decodeJwt from 'jwt-decode';

import request from './request';

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    request('/users/login', {
      method: 'POST',
      body: {
        email: username,
        password,
      },
    }).then(({ data }) => {
      const { token } = data;
      localStorage.setItem('token', token);
    });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeJwt(token);
      const tokenExpired =
        new Date().setUTCSeconds(decodedToken.exp) < new Date();
      tokenExpired
        ? Promise.reject({ redirectTo: '/login' })
        : Promise.resolve();
    } else {
      return Promise.reject();
    }
  }
};
