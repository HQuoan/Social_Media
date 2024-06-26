/* eslint-disable */
import '@babel/polyfill';
import { createSocket } from './socket.js';
import { login, logout, signup, forgot, reset } from './login.js';
import { updateUser } from './user.js';
import { createPost, deletePost, loadPost, loadPostScroll } from './post.js';
import {
  createRequest,
  updateFriendShip,
  deleteRequest,
} from './friendShip.js';
import { createEmoji } from './emoji.js';
import { getMyRooms, getRoomWithChat, getChat } from './room.js';

import {
  createComment,
  getReplyComments,
  updateComment,
  deleteComment,
  loadComments,
} from './comment.js';

const divContainer = document.querySelector('.container');
const loginForm = document.querySelector('.login-form');
const signUpForm = document.querySelector('.sign-up-form');
const forgotForm = document.querySelector('.forgot-form');
const resetForm = document.querySelector('.reset-form');
const btnLogout = document.querySelector('.btnLogout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const postDataForm = document.querySelector('.form-post');

// socket
createSocket(io);

// sử dụng cho các form KHÔNG có ảnh
const getFormData = function (form) {
  const btnSubmit = form.querySelector('.btnSubmit');
  if (btnSubmit)
    btnSubmit.innerHTML = `<i class="fas fa-sync-alt fa-spin"></i> Waiting`;
  const formData = {};
  const inputs = form.querySelectorAll('input, select, textarea');

  inputs.forEach((input) => {
    const { type, name, value, checked } = input;

    if (type === 'radio' && checked) {
      formData[name] = value;
    } else if (type === 'checkbox') {
      formData[name] = formData[name] || [];
      if (checked) {
        formData[name].push(value);
      }
    } else {
      formData[name] = value;
    }
  });

  return formData;
};

if (postDataForm) {
  postDataForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btnSubmit = postDataForm.querySelector('.btnSubmit');
    btnSubmit.innerHTML = `<i class="fas fa-sync-alt fa-spin"></i> Waiting`;

    const formData = new FormData(postDataForm);
    createPost(formData);
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnSubmit = userDataForm.querySelector('.btnSubmit');
    btnSubmit.innerHTML = `<i class="fas fa-sync-alt fa-spin"></i> Waiting`;

    const formData = new FormData(userDataForm);
    await updateUser(formData, 'data');

    userDataForm.querySelector('.btnSubmit').innerHTML = 'Update';
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await updateUser(getFormData(userPasswordForm), 'password');

    userPasswordForm.querySelector('.btnSubmit').innerHTML = 'Submit';
    userPasswordForm.querySelector('#cpass').value = '';
    userPasswordForm.querySelector('#npass').value = '';
    userPasswordForm.querySelector('#vpass').value = '';
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    logout();
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await login(getFormData(loginForm));

    loginForm.querySelector('.btnSubmit').innerHTML = 'Log in';
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await signup(getFormData(signUpForm));

    signUpForm.querySelector('.btnSubmit').innerHTML = 'Sign in';
  });
}

if (forgotForm) {
  forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await forgot(getFormData(forgotForm));

    forgotForm.querySelector('.btnSubmit').innerHTML = 'Submit';
  });
}

if (resetForm) {
  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await reset(getFormData(resetForm));

    resetForm.querySelector('.btnSubmit').innerHTML = 'Submit';
  });
}

// Upload and preview image

const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const upImg = document.getElementById('upImg');

if (fileInput && imagePreview && upImg) {
  fileInput.addEventListener('change', function () {
    previewImages(this.files);
  });

  upImg.addEventListener('click', function () {
    fileInput.click();
  });
}

function previewImages(files) {
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('image-container');

      const imgElement = document.createElement('img');
      imgElement.src = e.target.result;
      imgElement.classList.add('preview-image');
      imgContainer.appendChild(imgElement);

      const deleteIcon = document.createElement('span');
      deleteIcon.classList.add('delete-icon');
      deleteIcon.innerHTML = '&#10006;';
      deleteIcon.addEventListener('click', function () {
        imgContainer.remove();
      });

      imgContainer.appendChild(deleteIcon);
      imagePreview.appendChild(imgContainer);
    };

    reader.readAsDataURL(files[i]);
  }
}

// Load more posts
const wrapProfilePosts = document.getElementById('wrap-profile-posts');
const wrapPosts = document.getElementById('wrap-posts');
const loadPostBtn = document.getElementById('load-more-post');

if (wrapProfilePosts && loadPostBtn) {
  loadPost(wrapProfilePosts, loadPostBtn);
}

if (wrapPosts) {
  loadPostScroll(wrapPosts);
}

/// Friend
const btnAddFriends = document.querySelectorAll('.btnAddFriend');
if (btnAddFriends) {
  btnAddFriends.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const receiver = el.dataset.receiverId;
      createRequest(receiver);

      el.innerText = 'Requested';
    });
  });
}

const btnAcceptFriends = document.querySelectorAll('.accept-friend');

if (btnAcceptFriends) {
  btnAcceptFriends.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const reqId = el.dataset.requestId;
      updateFriendShip(reqId, 'accepted');
      el.innerText = 'Accepted';
    });
  });
}

const btnDeleteRequests = document.querySelectorAll('.delete-request');

if (btnDeleteRequests) {
  btnDeleteRequests.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const reqId = el.dataset.requestId;
      deleteRequest(reqId);
      el.innerText = 'Deleted';
    });
  });
}

const btnUnfriends = document.querySelectorAll('.unfriend');

if (btnUnfriends) {
  btnUnfriends.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const sender = el.dataset.sender;
      const data = {
        sender: el.dataset.sender,
        receiver: el.dataset.receiver,
      };
      deleteRequest(sender, data);
      el.innerText = 'Unfriended';
    });
  });
}

const rightSidebar = document.getElementById('right-sidebar');

rightSidebar.addEventListener('click', (event) => {
  const target = event.target;

  if (target.closest('.list-online-chat-item')) {
    const messagePage = document.getElementById('message-page');
    const x = target.closest('.list-online-chat-item');
    if (messagePage) {
      getChat(x);
    } else {
      getChat(x);
      const canvas = document.getElementById('canvas');
      canvas.click();
    }
  }
});

const isFirstClickMap = new Map();

divContainer.addEventListener('click', (event) => {
  const target = event.target;
  const parent = target.parentElement;

  /// room and chat
  if (target.closest('.room-item')) {
    const roomItem = target.closest('.room-item');
    getRoomWithChat(roomItem);
  }

  // emoji
  if (target.classList.contains('emoji-item')) {
    event.preventDefault();

    const likeData = target.closest('.like-data');
    if (likeData) {
      const emojiActive = likeData.querySelector('.emoji-active-item');
      emojiActive.src = target.src;

      const post = emojiActive.dataset.postId;
      const type = target.dataset.emoji;

      const data = {
        post,
        type,
      };

      createEmoji(data);
    }
  }

  // create comment
  const btnSubmitComment = target.closest('.btnSubmitComment');
  if (btnSubmitComment) {
    event.preventDefault();
    const form = target.closest('.comment-form');
    createComment(form, getFormData(form));
  }

  // load more comments
  const btnLoadMoreComments = document.querySelectorAll('.load-more-comments');
  btnLoadMoreComments.forEach((el) => {
    loadComments(el);
  });

  // get list reply comments
  if (parent.classList.contains('btn-reply')) {
    if (!isFirstClickMap.has(parent)) {
      // Nếu chưa được click trước đó, thực hiện hàm và đánh dấu là đã click
      getReplyComments(parent);
      isFirstClickMap.set(parent, true);
    }
  }

  // create reply comment
  if (target.classList.contains('btn-add-form-reply')) {
    event.preventDefault();
    // console.log(target);
    // console.log(target.dataset.parentCommentId);

    const block = target.closest('.block-add-form-create-comment');

    const postId = target.dataset.postId;
    const parentCommentId = target.dataset.parentCommentId;
    addFormCreateComment(block, postId, parentCommentId);
  }
  // btnUpdateComment
  const btnUpdateComment = target.closest('.btnUpdateComment');
  if (btnUpdateComment) {
    event.preventDefault();
    const divComment = btnUpdateComment.closest('.post-comments');
    const commentId = btnUpdateComment.dataset.commentId;
    addFormUpdateComment(divComment, commentId);
  }

  // btnDelComment
  const btnDelComment = target.closest('.btnDelComment');
  if (btnDelComment) {
    event.preventDefault();
    const divComment = btnDelComment.closest('.post-comments');
    const commentId = btnDelComment.dataset.commentId;
    deleteCommentFunc(divComment, commentId);
  }

  // delete post
  const btnDelPosts = document.querySelectorAll('.btnDelPost');

  if (btnDelPosts.length > 0) {
    btnDelPosts.forEach((btnDelPost) => {
      btnDelPost.addEventListener('click', () => {
        const postId = btnDelPost.dataset.postId;
        deletePost(postId);
      });
    });
  }
});

const addFormCreateComment = (block, postId, parentCommentId) => {
  var formHTML = `
      <form class="reply-comment-form comment-text d-flex align-items-center mt-3">
          <textarea class="comment-txt form-control rounded-pill" name="comment" rows="1" placeholder=""></textarea>
          <input type="hidden" name="post" value="${postId}">
          <input type="hidden" name="parentComment" value="${parentCommentId}">
          <div class="comment-attachment d-flex">
              <button type="submit" class="btn hover-blue"><i class="fa fa-paper-plane"></i></button>
              <button class="btn btnCancel hover-red"><i class="fas fa-times">Cancel</i></button>
          </div>
      </form>
  `;

  // Chuyển chuỗi HTML thành các phần tử DOM và thêm vào #block
  block.insertAdjacentHTML('beforeend', formHTML);

  // Nếu bạn muốn xử lý sự kiện submit, bạn có thể thêm sự kiện ở đây
  var lastForm = block.lastElementChild;
  const btnCancel = lastForm.querySelector('.btnCancel');
  if (btnCancel) {
    btnCancel.addEventListener('click', () => {
      block.removeChild(lastForm);
    });
  }

  lastForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await createComment(lastForm, getFormData(lastForm));

    // Xóa form sau khi xử lý submit
    block.removeChild(lastForm);
  });
};

const addFormUpdateComment = (divComment, commentId) => {
  const comment = divComment.querySelector('.comment-content');
  const text = comment.innerText;
  const block = divComment.querySelector('.block-add-form-create-comment');

  const formHTML = `
      <form class="reply-comment-form comment-text d-flex align-items-center mt-3">
          <textarea class="comment-txt form-control rounded-pill" name="comment" rows="1" placeholder="">${text}</textarea>
          <div class="comment-attachment d-flex">
              <button type="submit" class="btn"><i class="fa fa-paper-plane"></i></button>
              <button class="btn btnCancel"><i class="fa fa-paper-plane">Cancel</i></button>
          </div>
      </form>
  `;

  block.insertAdjacentHTML('beforeend', formHTML);

  const lastForm = block.lastElementChild;

  const btnCancel = lastForm.querySelector('.btnCancel');
  if (btnCancel) {
    btnCancel.addEventListener('click', () => {
      block.removeChild(lastForm);
    });
  }
  lastForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {};
    const commentValue = lastForm.querySelector(
      'textarea[name="comment"]',
    ).value;
    formData['comment'] = commentValue;

    const res = await updateComment(formData, commentId);
    if (res === 'success') {
      comment.innerText = commentValue;
    }
    block.removeChild(lastForm);
  });
};

const deleteCommentFunc = async (divComment, commentId) => {
  const res = await deleteComment(commentId);
  if (res.status === 204) {
    divComment.remove();
  }
};

/// Messenger

const messengerPage = document.getElementById('message-page');
if (messengerPage) {
  const roomsDiv = document.getElementById('conversations');

  getMyRooms(roomsDiv);
}
