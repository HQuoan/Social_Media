/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';

module.exports = async function (method, url, to, data, message) {
  try {
    const response = await axios({
      method,
      url,
      data,
    });

    if (response.data.status === 'success') {
      showAlert('success', message);
      if (to !== '') {
        setTimeout(() => {
          location.assign(to);
        }, 1000);
      }
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
    console.log(error);
  }
};
