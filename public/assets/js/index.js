/* eslint-disable */
import '@babel/polyfill';
import { login, logout, signup, forgot, reset } from './login.js';

const loginForm = document.querySelector('.login-form');
const signUpForm = document.querySelector('.sign-up-form');
const forgotForm = document.querySelector('.forgot-form');
const resetForm = document.querySelector('.reset-form');
const btnLogout = document.querySelector('.btnLogout');

const getFormData = function (form) {
  const btnSubmit = form.querySelector('.btnSubmit');
  btnSubmit.innerHTML = 'Waitting...';
  const formData = {};
  const inputs = form.querySelectorAll('input');

  inputs.forEach((input) => {
    formData[input.name] = input.value;
  });

  return formData;
};

if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    logout();
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login(getFormData(loginForm));
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    signup(getFormData(signUpForm));
  });
}

if (forgotForm) {
  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    forgot(getFormData(forgotForm));
  });
}

if (resetForm) {
  resetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    reset(getFormData(resetForm));
  });
}
