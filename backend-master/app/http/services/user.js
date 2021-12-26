const { transaction } = require('objection');

const { User, Post, FriendRequest } = require('../../models');
const { abort } = require('../../helpers/error');
const { getFullUrl } = require('../../helpers/image');
const postStatusEnum = require('../../enums/postStatus');
const postTypeEnum = require('../../enums/postType');

exports.getMyInformation = async (userId) => {
  const userInfo = await User
    .query()
    .findById(userId);

  if (!userInfo) return abort(400, 'User not found');

  userInfo.cover = getFullUrl(userInfo.cover_url) || getFullUrl(process.env.DEFAULT_COVER);
  userInfo.avatar = getFullUrl(userInfo.avatar_url) || getFullUrl(process.env.DEFAULT_AVATAR);
  
  return userInfo;
};

exports.updateAvatar = async ( userId, avatar_url ) => {
  try {
    console.log(userId + " " + avatar_url );
    await User.query().findById(userId).patch({
      avatar_url
    });
  } catch (error) {
    return abort(500, 'Cannot update your avatar');
  }
};

exports.getUserInformation = async ({ userId, myId }) => {
  const userInfo = await User
    .query()
    .findById(userId);

  if (!userInfo) return abort(400, 'User not found');

  const friendStatus = await FriendRequest.query()
    .where((builder) => builder.where('sender_id', userId).where('receiver_id', myId))
    .orWhere((builder) => builder.where('sender_id', myId).where('receiver_id', userId))
    .first();
  
  userInfo.cover = getFullUrl(userInfo.cover_url) || getFullUrl(process.env.DEFAULT_COVER);
  userInfo.avatar = getFullUrl(userInfo.avatar_url) || getFullUrl(process.env.DEFAULT_AVATAR);

  return {
    ...userInfo, friendStatus,
  };
};

exports.getUserPosts = async ({
  userId, limit, offset, myId,
}) => {
  const posts = await Post.query()
    .where({ user_id: userId })
    .andWhereNot('status', postStatusEnum.CLOSED)
    .andWhereNot('type', postTypeEnum.PRIVATE)
    .withGraphFetched('likes')
    .modifyGraph('likes', (builder) => {
      builder.whereNot('user_id', myId).select('id', 'type');
    })
    .withGraphFetched('likes.user')
    .modifyGraph('likes.user', (builder) => {
      builder.select('id', 'full_name');
    })
    .withGraphFetched('me')
    .modifyGraph('me', (builder) => {
      builder.where('user_id', myId).select('id', 'type');
    })
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc');

  const response = posts.map((post) => {
    let imgSign = getFullUrl(post.image_url);
    return {
      ...post, image: imgSign,
    };
  });

  const userInfo = await this.getUserInfo(userId);

  return { data: response, userInfo };
};

exports.getUserInfo = async (userId) => {
  const userInfo = await User.query().findById(userId).select('id', 'full_name', 'avatar_url');

  if (!userInfo) abort('user not found');
  userInfo.avatar = getFullUrl(userInfo.avatar_url) || getFullUrl(process.env.DEFAULT_AVATAR);

  return userInfo;
};

exports.getUserList = async (userIds) => {
  const userInfos = await User.query().whereIn('id', userIds).select('id', 'full_name', 'avatar_url');

  const response = userInfos.map((user) => {
    const imgSign = getFullUrl(user.avatar_url) || getFullUrl(process.env.DEFAULT_AVATAR);

    return {
      ...user, avatar: imgSign,
    };
  });

  return response;
};
