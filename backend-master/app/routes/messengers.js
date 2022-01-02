const express = require('express');
const { messengers: messengersController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.get('/messengers', auth, messengersController.getMessengers);
router.put('/messengers/friends/:friendId/reset/:last_msg', auth, messengersController.resetMessenger);

module.exports = router;