/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';

export const updateFriendShip = async (id, data) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: `api/v1/friendships/me/${id}`,
      data: {
        status: data,
      },
    });

    if (response.data.status === 'success') {
      showAlert('success', 'Accepted');
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
    console.log(error);
  }
};
