const express = require('express');
const blogController = require('./../controllers/blogController');
const authController = require('./../controllers/authController');


const router = express.Router();


router
    .route('/')
    .get(authController.protect, blogController.getAllBlogs)
    .post(authController.protect, blogController.createBlog)
router
    .route('/:id')
    .get(authController.protect, authController.restrictTo('admin'), blogController.getBlog)
    .patch(authController.protect, authController.restrictTo('admin'), blogController.updateBlog)
    .delete(authController.protect, authController.restrictTo('admin'), blogController.deleteBlog);


module.exports = router;
