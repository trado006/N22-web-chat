const messengersService = require('../../services/messengers');
const { abort } = require('../../../helpers/error');

async function resetMessenger(req, res) {
    friendId = req.params.friendId;
    last_msg = req.params.last_msg;
    userId = req.user.id;
    data = await messengersService.resetMessenger({ friendId, userId, last_msg });
    return res.status(201).json(data);
}

module.exports = resetMessenger;