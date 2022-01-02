const express = require('express');
const { messages: messagesController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.get('/messages/friends/:friendId/:last_msg', auth, messagesController.getFriendMessages);

module.exports = router;