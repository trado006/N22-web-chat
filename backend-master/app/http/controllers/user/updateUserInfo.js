const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const { User } = require('../../../models');

  const validate = async (params) => {
    const schema = Joi.object({
      fullName: Joi.string().min(3).max(127).required(),
      province: Joi.string().required(),
      district: Joi.string().required(),
      slogan: Joi.string().required(),
    });
    try {
      await Joi.validate(params, schema);
    } catch (error) {
      abort(400, 'Params Error');
    }
  };

  const updateUser = async ( id, { fullName, province, district, slogan,}) => {
      console.log('a');
      validate({fullName, province, district, slogan });
    try {
        await User.query().findById(id).patch({
            full_name: fullName,
            province, district, slogan,
        });
    } catch (error) {
      abort(400, 'Update user info failed');
    }
  };

  const updateUserInfo = async (req, res) => {
      console.log(req.user.id);
      console.log(req.body);
    const params = {
      fullName: req.body.fullName,
      province: req.body.province,
      district: req.body.district,
      slogan: req.body.slogan,
    };
    await validate(params);
    await updateUser(req.user.id, params);
    console.log('pass');
    return res.sendStatus(201);
  };
  
  module.exports = updateUserInfo;