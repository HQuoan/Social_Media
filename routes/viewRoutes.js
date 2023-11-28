const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(authController.isLoggedIn, viewController.getHomePage);
router.route('/sign-up').get(viewController.getFormSignUp);
router
  .route('/login')
  .get(authController.isLoggedIn, viewController.getFormLogin);
router.route('/forgot-password').get(viewController.getFormForgotPassword);
router.route('/reset-password').get(viewController.getFormResetPassword);
// router.route('./logout').get(viewController.logout);

router.route('/group').get(viewController.getGroup);

router.route('/me').get(viewController.getAccount);
router.route('/profile').get(viewController.getProfile);
// .get(authController.protect, viewsController.getProfile);

module.exports = router;
