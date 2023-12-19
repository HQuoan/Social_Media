/* eslint-disable */
import template from './templateURL.js';
import axios from 'axios';
import { showAlert } from './alerts.js';
import { commentItem } from './commentItem.js';

// const getPosts = async (page) => {
//   try {
//     const response = await axios({
//       method: 'GET',
//       url: `/api/v1/posts/me?limit=2&page=${page}`,
//     });

//     if (response.data.status === 'success') {
//       return response.data.data;
//     }
//   } catch (error) {
//     showAlert('error', error.response.data.message);
//     console.log(error);
//   }
// };

const appendComments = (div, comments) => {
  let html = '';
  comments.forEach((comment) => {
    html += commentItem(comment);
  });

  div.innerHTML = html + div.innerHTML;
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

// export const loadPost = (div, btn) => {
//   let page = 2;
//   btn.addEventListener('click', async () => {
//     const posts = await getPosts(page);
//     page++;
//     if (posts.length > 0) {
//       appendPosts(div, posts);
//     } else {
//       btn.style.display = 'none';
//     }
//   });
// };
