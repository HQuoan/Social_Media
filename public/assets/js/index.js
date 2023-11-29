/* eslint-disable */
import '@babel/polyfill';
import { login, logout, signup, forgot, reset } from './login.js';
import { updateUser } from './user.js';
import { showAlert } from './alerts.js';

const loginForm = document.querySelector('.login-form');
const signUpForm = document.querySelector('.sign-up-form');
const forgotForm = document.querySelector('.forgot-form');
const resetForm = document.querySelector('.reset-form');
const btnLogout = document.querySelector('.btnLogout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
// sử dụng cho các form CÓ ảnh
const getFormData2 = function (form) {
  const btnSubmit = form.querySelector('.btnSubmit');
  btnSubmit.innerHTML = `<i class="fas fa-sync-alt fa-spin"></i> Waiting`;

  const formData = new FormData();
  const inputs = form.querySelectorAll('input');
  const textareas = form.querySelectorAll('textarea');

  inputs.forEach((input) => {
    if (input.type === 'radio') {
      if (input.checked) {
        formData.append(input.name, input.value);
      }
    } else if (input.type === 'text') {
      formData.append(input.name, input.value);
    } else if (input.type === 'file') {
      formData.append(input.name, input.files[0]);
    } else if (input.type === 'date') {
      formData.append(input.name, input.value);
    }
  });

  textareas.forEach((el) => {
    formData.append(el.name, el.value);
  });

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
