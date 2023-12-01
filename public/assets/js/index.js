/* eslint-disable */
import '@babel/polyfill';
import { login, logout, signup, forgot, reset } from './login.js';
import { updateUser } from './user.js';
import { createPost } from './post.js';
import { showAlert } from './alerts.js';

const loginForm = document.querySelector('.login-form');
const signUpForm = document.querySelector('.sign-up-form');
const forgotForm = document.querySelector('.forgot-form');
const resetForm = document.querySelector('.reset-form');
const btnLogout = document.querySelector('.btnLogout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const postDataForm = document.querySelector('.form-post');

// sử dụng cho các form CÓ ảnh
const getFormData2 = function (form) {
  // const btnSubmit = form.querySelector('.btnSubmit');
  // btnSubmit.innerHTML = `<i class="fas fa-sync-alt fa-spin"></i> Waiting`;

  const formData = new FormData(form);
  return formData;
};

// sử dụng cho các form KHÔNG có ảnh
const getFormData = function (form) {
  const btnSubmit = form.querySelector('.btnSubmit');
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
    createPost(getFormData2(postDataForm));
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', async (e) => {
    console.log('hi');
    e.preventDefault();
    // console.log(getFormData(userDataForm));
    await updateUser(getFormData2(userDataForm), 'data');

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
      deleteIcon.innerHTML = '&#10006;'; // Unicode for 'X' character
      deleteIcon.addEventListener('click', function () {
        imgContainer.remove(); // Xóa ảnh khi người dùng nhấp vào biểu tượng xóa
      });

      imgContainer.appendChild(deleteIcon);
      imagePreview.appendChild(imgContainer);
    };

    reader.readAsDataURL(files[i]);
  }
}
