const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(viewController.alerts);

router.get('/', authController.isLoggedIn, viewController.getHomePage);
router.get('/sign-up', viewController.getFormSignUp);
router.get('/login', authController.isLoggedIn, viewController.getFormLogin);
router.get('/forgot-password', viewController.getFormForgotPassword);
router.get('/reset-password', viewController.getFormResetPassword);

router.get('/group', viewController.getGroup);

router.get('/profile-edit', authController.protect, viewController.getAccount);
router.get('/profile', authController.protect, viewController.getProfile);
// .get(authController.protect, viewsController.getProfile);

module.exports = router;
