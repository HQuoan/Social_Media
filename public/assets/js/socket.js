/* eslint-disable */
import template from './templateURL.js';

let friends = {};

const viewOnlineUsers = (users) => {
  const wrapOnlineUser = document.getElementById('list-online');
  let html = '';

  users.forEach((user) => {
    if (user.isOnline) {
      html += `
      <div class="d-flex align-items-center mb-4 list-online-chat-item" data-friend="${user.id}">
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
      <div class="d-flex align-items-center mb-4 list-online-chat-item" data-friend="${
        user.id
      }">
        <div class="iq-profile-avatar status-offline">
          <img class="rounded-circle avatar-50" src="./img/users/${
            user.avatar
          }" alt="">
        </div>
        <div class="ms-3">
          <h6 class="mb-0">${user.username}</h6>
          <p class="mb-0">${moment(user.latestActivity).fromNow()}</p>
        </div>
      </div>
      `;
    }
  });

  wrapOnlineUser.innerHTML = html;
};

const getFriends = async () => {
  const url = `/api/v1/friendships/friends`;
  return await template('GET', url, '', {}, '');
};

const sendMessageDB = async (data) => {
  const url = `/api/v1/messages/me`;
  // console.log('data: ', data);
  await template('POST', url, '', data, '');
};

const getUser = (userId) => {
  return friends.find((user) => user.id === userId);
};

export const createSocket = async (io) => {
  const userId = document.getElementById('user_id').dataset.userId;
  const userAvatar = document.getElementById('user_avatar').dataset.userAvatar;

  if (userId !== 'undefined') {
    const socket = io();

    friends = await getFriends();
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
      // console.log(list);
      viewOnlineUsers(list);
      // console.log(' loc: ', friends);
    });

    socket.on('getMessage', (data) => {
      const audio = new Audio('../audio/ting-ting.mp3');

      // Phát âm thanh
      audio.play();

      const { sender, text } = data;
      appendMessageReceiver(getUser(sender), text);
    });

    ////////////////// xử lý các sk , emit

    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      wrapper.addEventListener('click', (e) => {
        const target = e.target;

        const messageInput = document.getElementById('messageInput');
        const sendMessageBtn = document.getElementById('sendMessageBtn');

        if (messageInput && sendMessageBtn) {
          messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessageBtn.click();
            }
          });
        }

        // console.log(target);

        if (target.closest('.sendMessage')) {
          const x = target.closest('.sendMessage');
          // const messageContent = document.querySelector('.message-content');
          const text = messageInput.value;
          // console.log(text);

          if (text !== '') {
            const sender = x.dataset.sender;
            const receiver = x.dataset.receiver;
            const roomId = x.dataset.room;

            const data = {
              sender,
              receiver,
              text,
            };
            socket.emit('sendMessage', data);

            appendMessageSender(userAvatar, text);
            messageInput.value = '';

            const dataMessage = {
              room: roomId,
              content: text,
            };

            sendMessageDB(dataMessage);
          }
        }
      });
    }
  }
};

const appendMessageReceiver = (user, text) => {
  const chatBox = document.getElementById('chat-box');
  const html = `
  <div class="chat chat-left">
        <div class="chat-user">
          <a class="avatar m-0">
            <img src="../img/users/${
              user.avatar
            }" alt="avatar" class="avatar-35">
          </a>
          <span class="chat-time mt-1">${moment(Date.now()).format('LT')}</span>
        </div>
        <div class="chat-detail">
          <div class="chat-message">
            <p>${text}</p>
          </div>
        </div>
      </div>
  `;

  chatBox.insertAdjacentHTML('beforeend', html);
};

const appendMessageSender = (userAvatar, text) => {
  const chatBox = document.getElementById('chat-box');
  const html = `
  <div class="chat d-flex other-user">
  <div class="chat-user">
    <a class="avatar m-0">
      <img src="../img/users/${userAvatar}" alt="avatar" class="avatar-35">
    </a>
    <span class="chat-time mt-1">${moment(Date.now()).format('LT')}</span>
  </div>
  <div class="chat-detail">
    <div class="chat-message">
      <p>${text}</p>
    </div>
  </div>
</div>
  `;

  chatBox.insertAdjacentHTML('beforeend', html);
};
