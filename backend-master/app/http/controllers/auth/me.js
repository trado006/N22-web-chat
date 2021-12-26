const { getFullUrl } = require('../../../helpers/image');

const me = async (req, res) => {
  const responseData = {
    id: req.user.id,
    full_name: req.user.full_name,
  };

  const avatar = ( getFullUrl(req.user.avatar_url) || getFullUrl(process.env.DEFAULT_AVATAR) );

  return res.status(200).send({ ...responseData, avatar });
};

module.exports = me;
