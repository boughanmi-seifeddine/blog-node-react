const express = require('express');
const blogController = require('./../controllers/blogController');
const authController = require('./../controllers/authController');
const {body} = require("express-validator");

const router = express.Router();

router
    .route('/')
    .get(authController.protect, blogController.getAllBlogs)
    .post(
        body('author').not().isEmpty().trim().escape(),
        body('title').not().isEmpty().withMessage('must provide title').trim().escape()
            .isLength({min: 10}).withMessage('must have at least 10 characters')
            .custom((value, {req}) => {
                if (value.includes('shit')) {
                    // trow error if passwords do not match
                    throw new Error("title must not contain word shit");
                } else {
                    return value;
                }
            }),
        body('content', "author not provided ..").not().isEmpty().trim().escape()
        , blogController.createBlog)
router
    .route('/:id')
    .get(blogController.getBlog)
    .patch(authController.protect, authController.restrictTo('admin'), blogController.updateBlog)
    .delete(authController.protect, blogController.deleteBlog);


module.exports = router;
