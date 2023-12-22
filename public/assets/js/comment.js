/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';
import template from './templateURL.js';
import { commentItem } from './commentItem.js';

const appendComments = (div, comments, position = 'top') => {
  let html = '';
  comments.forEach((comment) => {
    html += commentItem(comment);
  });
  console.log('div: ' + div);
  if (position === 'top') {
    div.innerHTML = html + div.innerHTML;
  } else if (position === 'bottom') {
    div.innerHTML += html;
  } else {
    div.innerHTML = html;
  }
};

const appendReplyComments = (div, comments) => {
  let html = '<li class="mt-2">';
  comments.forEach((comment) => {
    html += commentItem(comment, 3);
  });

  div.innerHTML = html + '</li>' + div.innerHTML;
};

const getCommentsOnPost = async (postId) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `api/v1/posts/${postId}/comments/parent`,
    });

    if (response.data.status === 'success') {
      return response.data.data;
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
    console.log(error);
  }
};

export const loadComments = (btn) => {
  const postId = btn.dataset.postId;
  // console.log(btn, postId);

  const wrap = btn.closest('.wrap-comment');
  const div = wrap.querySelector('.comment-box');

  const loadMoreHandler = async () => {
    const comments = await getCommentsOnPost(postId);

    if (comments.length > 0) {
      appendComments(div, comments, 'all');
      btn.style.display = 'none';
    }
  };

  btn.addEventListener('click', loadMoreHandler);
};

export const createComment = async (_form, data) => {
  const url = `/api/v1/comments/me`;
  const comment = await template('POST', url, '', data, 'Created Comment');
  console.log(comment);

  if (!comment) return;

  const comments = [];
  comments.push(comment);

  const wrap = _form.closest('.wrap-comment');
  const commentBox = wrap.querySelector('.comment-box');
  appendComments(commentBox, comments);
};

export const getReplyComments = async (btnReply) => {
  const commentId = btnReply.dataset.commentId;
  const url = `api/v1/comments/${commentId}/reply`;

  try {
    const response = await axios({
      method: 'GET',
      url,
    });

    const wrap = btnReply.closest('.post-comments');
    const box = wrap.querySelector('.reply-comment');
    appendReplyComments(box, response.data.data);
  } catch (error) {
    showAlert('error', error.response.data.message);
    console.log(error);
  }
};

export const updateComment = async (data, commentId) => {
  const url = `api/v1/comments/me/${commentId}`;

  try {
    const response = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (response.data.status === 'success') {
      showAlert('success', ' Update comment successfully');
    }
    return response.data.status;
  } catch (error) {
    showAlert('error', error.response.data.message);
    console.log(error);
  }
};

export const deleteComment = async (commentId) => {
  const url = `api/v1/comments/me/${commentId}`;

  try {
    const response = await axios({
      method: 'DELETE',
      url,
    });
    if (response.status === 204) {
      showAlert('success', ' Delete comment successfully');
    }
    return response;
  } catch (error) {
    showAlert('error', error.response.data.message);
    console.log(error);
  }
};
