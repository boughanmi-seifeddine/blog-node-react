const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const {body} = require("express-validator");
/**
 *
 * @type {Router}
 */
const router = express.Router();
/**
 * @route Get api/v1/users
 */
router.get('/logout', authController.protect, authController.logout);
router.post('/signup', body('passwordConfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
    }

    // Indicates the success of this synchronous custom validator
    return true;
}), authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
    '/updateMyPassword',
    authController.protect,
    authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
    .route('/')
    .get(userController.getAllUsers)


module.exports = router;
