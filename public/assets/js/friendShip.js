/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';
import template from './templateURL.js';

export const createRequest = async (receiver) => {
  const data = {
    receiver,
  };

  template('POST', '/api/v1/friendships/me', '', data, 'Successfully!');
};

export const updateFriendShip = async (id, status) => {
  const url = `api/v1/friendships/me/${id}`;

  const data = {
    status,
  };

  template('PATCH', url, '', data, 'Accepted!');
};
export const deleteRequest = async (id, data = {}) => {
  const url = `api/v1/friendships/me/${id}`;
  template('DELETE', url, '', data, 'Deleted!');
};
