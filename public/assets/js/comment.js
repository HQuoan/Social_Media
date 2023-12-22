/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';
import template from './templateURL.js';
import { commentItem } from './commentItem.js';

const appendComments = (div, comments) => {
  let html = '';
  comments.forEach((comment) => {
    html += commentItem(comment);
  });

  div.innerHTML = html + div.innerHTML;
};

const appendReplyComments = (div, comments) => {
  let html = '<li class="mt-2">';
  comments.forEach((comment) => {
    html += commentItem(comment, 3);
  });

  div.innerHTML = html + '</li>' + div.innerHTML;
};

const getCommentsOnPost = async (page, postId) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `api/v1/posts/${postId}/comments/parent?&limit=2&page=${page}`,
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
  console.log(btn, postId);
  const div = btn.closest('.comment-box');

  let page = 2;
  btn.addEventListener('click', async () => {
    const comments = await getCommentsOnPost(page, postId);
    page++;
    if (comments.length > 0) {
      appendComments(div, comments);
    } else {
      btn.style.display = 'none';
    }
  });
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
