/* eslint-disable */
import '@babel/polyfill';
import { login, logout, signup, forgot, reset } from './login.js';
import { updateUser } from './user.js';
import { createPost, deletePost, loadPost, loadPostScroll } from './post.js';
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
// sử dụng cho các form CÓ ảnh
// const getFormData2 = function (form) {
//   const btnSubmit = form.querySelector('.btnSubmit');
//   btnSubmit.innerHTML = `<i class="fas fa-sync-alt fa-spin"></i> Waiting`;

//   const formData = new FormData(form);
//   return formData;
// };

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

fileInput.addEventListener('change', function () {
  previewImages(this.files);
});

upImg.addEventListener('click', function () {
  fileInput.click();
});

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

// create comment
const commentForms = document.querySelectorAll('.comment-form');

if (commentForms.length > 0) {
  commentForms.forEach((commentForm) => {
    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await createComment(commentForm, getFormData(commentForm));
      commentForm.querySelector('.comment-txt').value = '';
    });
  });
}

const isFirstClickMap = new Map();

divContainer.addEventListener('click', (event) => {
  const target = event.target;
  const parent = target.parentElement;
  // console.log(target);

  // const btnLoadMoreComments = document.querySelectorAll('.load-more-comments');
  // btnLoadMoreComments.forEach((el) => {
  //   loadComments(el);
  // });

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
              <button type="submit" class="btn"><i class="fa fa-paper-plane"></i></button>
          </div>
      </form>
  `;

  // Chuyển chuỗi HTML thành các phần tử DOM và thêm vào #block
  block.insertAdjacentHTML('beforeend', formHTML);

  // Nếu bạn muốn xử lý sự kiện submit, bạn có thể thêm sự kiện ở đây
  var lastForm = block.lastElementChild;
  lastForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    var commentValue = lastForm.querySelector('textarea[name="comment"]').value;
    await createComment(lastForm, getFormData(lastForm));
    alert('Submitted: ' + commentValue);

    // Xóa form sau khi xử lý submit
    block.removeChild(lastForm);
  });
};

const addFormUpdateComment = (divComment, commentId) => {
  const comment = divComment.querySelector('.comment-content');
  const text = comment.innerText;
  console.log(comment);
  const block = divComment.querySelector('.block-add-form-create-comment');

  const formHTML = `
      <form class="reply-comment-form comment-text d-flex align-items-center mt-3">
          <textarea class="comment-txt form-control rounded-pill" name="comment" rows="1" placeholder="">${text}</textarea>
          <div class="comment-attachment d-flex">
              <button type="submit" class="btn"><i class="fa fa-paper-plane"></i></button>
          </div>
      </form>
  `;

  block.insertAdjacentHTML('beforeend', formHTML);

  const lastForm = block.lastElementChild;
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
