const express = require('express');
const { user: userController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.get('/my-page', auth, userController.getMyPage);
router.post('/me/update-info', auth, userController.updateUserInfo);

router.post('/me/update-avatar', auth, userController.updateAvatar);

router.get('/users/:userId/page', auth, userController.getUserPage);
router.get('/users/:userId/posts', auth, userController.getUserPosts);

router.get('/users/info/:userId', auth, userController.getUserInfo);
// router.get('/users/list', auth, userController.getUserList);

module.exports = router;
