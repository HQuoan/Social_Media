const express = require('express');
const multer = require('multer');

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

// Set up multer middleware with diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/posts');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });

const upload = multer({ storage: storage });

router
  .route('/')
  .get(postController.getAllPosts)
  .post(
    authController.protect,
    upload.array('images'),
    postController.createPost,
  );

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
