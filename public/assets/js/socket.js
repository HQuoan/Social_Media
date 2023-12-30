/* eslint-disable */
import template from './templateURL.js';

const getFriends = async () => {
  const url = `/api/v1/friendships/friends`;
  const friends = await template('GET', url, '', {}, '');
  return friends;
};

const viewOnlineUsers = (users) => {
  const wrapOnlineUser = document.getElementById('list-online');
  let html = '';

  users.forEach((user) => {
    if (user.isOnline) {
      html += `
      <div class="d-flex align-items-center mb-4">
        <div class="iq-profile-avatar status-online">
          <img class="rounded-circle avatar-50" src="./img/users/${user.avatar}" alt="">
        </div>
        <div class="ms-3">
          <h6 class="mb-0">${user.username}</h6>
          <p class="mb-0">Online</p>
        </div>
      </div>
      `;
    } else {
      html += `
      <div class="d-flex align-items-center mb-4">
        <div class="iq-profile-avatar status-offline">
          <img class="rounded-circle avatar-50" src="./img/users/${user.avatar}" alt="">
        </div>
        <div class="ms-3">
          <h6 class="mb-0">${user.username}</h6>
          <p class="mb-0">Offline</p>
        </div>
      </div>
      `;
    }
  });

  wrapOnlineUser.innerHTML = html;
};

export const createSocket = async (io) => {
  const userId = document.getElementById('user_id').dataset.userId;

  if (userId !== 'undefined') {
    const socket = io();

    const friends = await getFriends();
    // console.log(friends);

    socket.emit('addUser', userId);

    socket.on('getOnlineUsers', (onlineUsers) => {
      // console.log(onlineUsers);
      let list = [];

      friends.forEach((friend) => {
        const isOnline = onlineUsers.some((user) => user.userId === friend.id);
        friend.isOnline = isOnline;
        if (isOnline) {
          list.unshift(friend);
        } else {
          list.push(friend);
        }
      });

      viewOnlineUsers(list);
      // console.log(' loc: ', friends);
    });
  }
};
