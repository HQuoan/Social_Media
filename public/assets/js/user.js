/* eslint-disable */
import template from './templateURL.js';

export const updateUser = async (data, type) => {
  const url =
    type === 'password'
      ? '/api/v1/users/updateMyPassword'
      : '/api/v1/users/updateMe';
  const to = type === 'password' ? '' : '/profile-edit';
  await template(
    'PATCH',
    url,
    to,
    data,
    `${type.toUpperCase()} updated successfully!`,
  );
};
