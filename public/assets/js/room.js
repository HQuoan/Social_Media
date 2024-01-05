/* eslint-disable */
import template from './templateURL.js';

const roomItem = (roomId, user) => {
  return `
 <li>
    <div class="room-item mb-3" data-room-id="${roomId}">
      <div class="d-flex align-items-center">
        <div class="avatar me-2">
          <img src="../img/users/${user.avatar}" alt="chatuserimage" class="avatar-50">
        </div>
        <div class="chat-sidebar-name">
          <h6 class="mb-0">${user.username}</h6>
          <span>Lorem Ipsum is</span>
        </div>
        <div class="chat-meta float-right text-center mt-2 me-1">
          <div class="chat-msg-counter bg-primary text-white">20</div>
          <span class="text-nowrap">05 min</span>
        </div>
      </div>
    </div>
  </li>
 `;
};

const messageItem = (user, room) => {
  const userId = document.getElementById('user_id').dataset.userId;
  const { messages } = room;

  let previousDate = null;

  const chatContent =
    messages.length > 0
      ? messages
          .map((message) => {
            const isCurrentUser = message.user.id === userId;
            const messageDate = moment(message.createdAt);
            const showFullDate =
              !previousDate || !messageDate.isSame(previousDate, 'day');

            previousDate = messageDate;

            return `
            <p>${showFullDate ? messageDate.format('llll') : ''}</p>
              <div class="chat ${
                isCurrentUser ? 'd-flex other-user' : 'chat-left'
              }">
                <div class="chat-user">
                  <a class="avatar m-0">
                    <img src="../img/users/${
                      message.user.avatar
                    }" alt="avatar" class="avatar-35 rounded">
                  </a>
                  <span class="chat-time mt-1">
                    ${messageDate.format('LT')}
                  </span>
                </div>
                <div class="chat-detail">
                  <div class="chat-message">
                    <p>${message.content}</p>
                  </div>
                </div>
              </div>
            `;
          })
          .join('')
      : 'Start conversation';

  return `
  <div class="tab-pane fade active show" role="tabpanel">
  <div class="chat-head">
    <header class="d-flex justify-content-between align-items-center bg-white pt-3 pe-3 pb-3">
      <div class="d-flex align-items-center">
        <div class="sidebar-toggle">
          <i class="ri-menu-3-line"></i>
        </div>
        <div class="avatar chat-user-profile m-0 me-3">
          <img src="../img/users/${user.avatar}" alt="avatar" class="avatar-50 rounded">
        </div>
        <h5 class="mb-0">${user.username}</h5>
      </div>
      <div class="chat-header-icons d-flex">
        <a class="chat-icon-phone bg-soft-primary" href="#">
          <i class="ri-phone-line"></i>
        </a>
        <a class="chat-icon-video bg-soft-primary" href="#">
          <i class="ri-vidicon-line"></i>
        </a>
        <a class="chat-icon-delete bg-soft-primary" href="#">
          <i class="ri-delete-bin-line"></i>
        </a>
        <span class="dropdown bg-soft-primary">
          <i id="dropdownMenuButton02" class="ri-more-2-line cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer pe-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu"></i>
          <span class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton02">
            <a class="dropdown-item" href="#">
              <i class="ri-pushpin-2-line me-1 h5"></i>
              Pin to top
            </a>
            <a class="dropdown-item" href="#">
              <i class="ri-delete-bin-6-line me-1 h5"></i>
              Delete chat
            </a>
            <a class="dropdown-item" href="#">
              <i class="ri-time-line me-1 h5"></i>
              Block
            </a>
          </span>
        </span>
      </div>
    </header>
    <div id="chat-box" class="chat-content scroller">
      ${chatContent}
    </div>
    <div class="chat-footer p-3 bg-white">
      <div class="d-flex align-items-center" action="#">
        <div class="chat-attagement d-flex">
          <a href="#">
            <i class="far fa-smile pe-3" aria-hidden="true"></i>
          </a>
          <a href="#">
            <i class="fa fa-paperclip pe-3" aria-hidden="true"></i>
          </a>
        </div>
        <input id="messageInput" type="text" class="message-content form-control me-3" placeholder="Type your message">
        <button id="sendMessageBtn" type="button" data-receiver="${user.id}" data-sender="${userId}" data-room="${room.id}" class="sendMessage btn btn-primary d-flex align-items-center px-2">
          <i class="far fa-paper-plane" aria-hidden="true"></i>
          <span class="d-none d-lg-block ms-1">Send</span>
        </button>
      </div>
    </div>
  </div>
</div>

  `;
};

const appendRooms = (div, rooms) => {
  const userId = document.getElementById('user_id').dataset.userId;
  let html = '';

  rooms.forEach((room) => {
    if (room.members.length === 2) {
      const x =
        room.members[0].id === userId ? room.members[1] : room.members[0];
      html += roomItem(room.id, x);
    }
  });

  div.innerHTML = html;
};

const appendMessages = (div, room) => {
  const userId = document.getElementById('user_id').dataset.userId;
  let x = {};

  if (room.members.length === 2) {
    x = room.members[0].id === userId ? room.members[1] : room.members[0];
  }

  div.innerHTML = messageItem(x, room);
};

export const getMyRooms = async (div) => {
  const url = '/api/v1/rooms/me';
  const myRooms = await template('GET', url, '', {}, '');
  // console.log(myRooms);

  appendRooms(div, myRooms);
};

export const getRoomWithChat = async (divRoom) => {
  const roomId = divRoom.dataset.roomId;
  // console.log(roomId);

  const url = `/api/v1/rooms/me/${roomId}`;
  const room = await template('GET', url, '', {}, '');
  // console.log(room);

  const divChat = document.getElementById('chat');
  appendMessages(divChat, room);
};

export const getChat = async (div) => {
  const userId = document.getElementById('user_id').dataset.userId;
  const friendId = div.dataset.friend;

  const data = {
    members: [userId, friendId],
  };

  const url = `/api/v1/rooms/me/`;
  const room = await template('POST', url, '', data, '');
  console.log(room);

  const divChat = document.getElementById('chat');
  appendMessages(divChat, room);
};
