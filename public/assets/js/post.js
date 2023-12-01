/* eslint-disable */
import template from './templateURL.js';

export const createPost = (data) => {
  template('POST', '/api/v1/posts', '/', data, 'Successfully!');
};
