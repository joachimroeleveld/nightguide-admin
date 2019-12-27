import decodeJwt from 'jwt-decode';

import request from './request';

export default {
  login: params => {
    const { username, password } = params;
    return request('/users/login', {
      method: 'POST',
      body: {
        email: username,
        password,
      },
    }).then(({ data }) => {
      const { token } = data;
      localStorage.setItem('token', token);
    });
  },
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  checkAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeJwt(token);
      const tokenExpired =
        new Date().setUTCSeconds(decodedToken.exp) < new Date();
      return tokenExpired
        ? Promise.reject({ redirectTo: '/login' })
        : Promise.resolve();
    } else {
      return Promise.reject();
    }
  },
  checkError: error => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
};
