const Joi = require('joi');

const userService = require('../../services/user');
const { abort } = require('../../../helpers/error');

async function validation(userInfo) {
  try {
    const schema = Joi.object().keys({
      userId: Joi.number().integer().min(1).required(),
      myId: Joi.number().integer().min(1).required(),
      offset: Joi.number().integer().required(),
      limit: Joi.number().integer().required(),
    });

    return await Joi.validate(userInfo, schema);
  } catch (error) {
    return abort(400, 'Params error');
  }
}
async function getUserPosts(req, res) {
//   const userInfo = {
//     userId: Number(req.params.userId),
//     offset: parseInt(req.query.offset),
//     limit: parseInt(req.query.limit),
//     myId: parseInt(req.user.id),
//   };

  //await validation(userInfo);
  userId = req.params.userId;
  myId = req.user.id;

  const responseData = await userService.getUserPosts({ userId, myId });

  return res.status(200).send(responseData);
}

module.exports = getUserPosts;
