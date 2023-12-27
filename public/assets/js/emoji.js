/* eslint-disable */
import template from './templateURL.js';

export const createEmoji = async (data) => {
  const url = `/api/v1/emojis/me`;
  let message = '';
  if (data.type === 'null') {
    message = 'Cancel Successfully';
  } else {
    message = 'Created Emoji';
  }
  await template('POST', url, '', data, message);
};
