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

export const createComment = async (_form, data) => {
  const url = `/api/v1/comments/me`;
  const comment = await template('POST', url, '', data, 'Created Comment');
  // console.log(comment);

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
