const messengersService = require('../../services/messengers');
const { abort } = require('../../../helpers/error');

async function getMessengers(req, res) {
    const data = await messengersService.getMessengers(req.user.id);
    return res.status(201).json(data);
}

module.exports = getMessengers;