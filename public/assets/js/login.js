/* eslint-disable */
import template from './templateURL.js';

export const login = async (data) => {
  template('POST', '/api/v1/users/login', '/', data, 'Logged in successfully!');
};

export const signup = async (data) => {
  template('POST', '/api/v1/users/signup', '/', data, 'Sign up successfully!');
};

export const forgot = async (data) => {
  await template(
    'POST',
    '/api/v1/users/forgotPassword',
    '/reset-password',
    data,
    'Successfully!',
  );
};

export const reset = async (data) => {
  let url = '';
  if (data.token) {
    url = '/api/v1/users/resetPassword/' + data.token;
    delete data.token;
  }
  template('POST', url, '/', data, 'Successfully!');
};

export const logout = async () => {
  const data = {};
  template('GET', '/api/v1/users/logout', '/', data, ':Logout successfully!');
};
