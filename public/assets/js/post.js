/* eslint-disable */
import template from './templateURL.js';
import axios from 'axios';
import { showAlert } from './alerts.js';
import { postItem } from './postItem.js';

export const createPost = (data) => {
  template('POST', '/api/v1/posts', '/profile', data, 'Successfully!');
};

const getPosts = async (page) => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/v1/posts?limit=2&page=' + page,
    });

    if (response.data.status === 'success') {
      return response.data.data;
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
    console.log(error);
  }
};

const appendPosts = (div, posts) => {
  let html = '';
  posts.forEach((post) => {
    html += postItem(post);
  });

  div.innerHTML += html;
};

export const loadPost = (div, btn) => {
  let page = 2;
  btn.addEventListener('click', async () => {
    const posts = await getPosts(page);
    page++;
    if (posts.length > 0) {
      appendPosts(div, posts);
    } else {
      btn.style.display = 'none';
    }
  });
};
