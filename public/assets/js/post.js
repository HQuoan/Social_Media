/* eslint-disable */
import template from './templateURL.js';
import axios from 'axios';
import { showAlert } from './alerts.js';
import { postItem } from './postItem.js';

export const createPost = (data) => {
  template('POST', '/api/v1/posts', '/profile', data, 'Successfully!');
};

const getAllPosts = async (page) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `/api/v1/posts?limit=2&page=${page}`,
    });

    if (response.data.status === 'success') {
      return response.data.data;
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
    console.log(error);
  }
};

const getPosts = async (userId, page) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `/api/v1/users/${userId}/posts?limit=2&page=${page}`,
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
  const userId = btn.dataset.userid;
  btn.addEventListener('click', async () => {
    const posts = await getPosts(userId, page);
    page++;
    if (posts.length > 0) {
      appendPosts(div, posts);
    } else {
      btn.style.display = 'none';
    }
  });
};

export const loadPostScroll = (div) => {
  const loadGif = document.getElementById('load-gif');

  let page = 2;
  let loading = false;
  let disable = false;

  window.addEventListener('scroll', async () => {
    const y = window.scrollY;
    const divHeight = div.offsetHeight;

    if (y >= divHeight - 500 && !loading && !disable) {
      loading = true;
      try {
        const posts = await getAllPosts(page);
        page++;
        if (posts.length > 0) {
          appendPosts(div, posts);
        } else {
          disable = true;
          loadGif.style.display = 'none';
        }
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        loading = false;
      }
    }
  });
};
