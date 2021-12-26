const bcrypt = require('bcrypt');

const { generate } = require('../../helpers/jwt');
const { User } = require('../../models');
const { abort } = require('../../helpers/error');
const userStatus = require('../../enums/userStatus');
const { getFullUrl } = require('../../helpers/image')

const SALT_ROUND = 10;

exports.signIn = async ({ email, password }) => {
  const user = await User.query().findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return abort(400, 'Email or password is incorrect');
  }
  user.avatar  = getFullUrl(user.avatar_url) || getFullUrl(process.env.DEFAULT_AVATAR);
  delete user.avatar_url;
  const accessToken = await generate({ userId: user.id });
  return { accessToken, user };
};

exports.signUp = async ({
  email, password, fullName, mssv, province, district, slogan, gender, birthday,
}) => {
  const hashPassword = await bcrypt.hash(password, SALT_ROUND);

  if (await User.hasEmail(email)) {
    abort(400, 'Email đã tồn tại');
  }

  if (await User.hasMssv(mssv)) {
    abort(400, 'MSSV đã tồn tại');
  }

  try {
    await User.query().insert({
      email,
      password: hashPassword,
      full_name: fullName,
      mssv,
      province,
      district,
      slogan,
      gender,
      birthday,
      status: userStatus.ACTIVE,
    });
  } catch (error) {
    abort(400, 'Sign up failed');
  }
};