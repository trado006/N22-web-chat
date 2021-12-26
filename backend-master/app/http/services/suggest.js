const { raw } = require('objection');

const { FriendRequest, User } = require('../../models');
const friendRequestStatus = require('../../enums/friendRequestStatus');
const { getFullUrl } = require('../../helpers/image');

exports.suggestMyFriend = async ({
  keyword, offset, limit, userId,
}) => {
  const friendObj = await FriendRequest.query()
    .joinRelated('[sender, receiver]')
    .where('friend_requests.status', friendRequestStatus.ACCEPTED)
    .where((builder) => builder.where('sender_id', userId)
      .orWhere('receiver_id', userId))
    .andWhere(raw(`CASE sender_id WHEN ${userId} THEN receiver.full_name  ELSE sender.full_name END`), 'like', `%${keyword}%`)
    .orWhere(raw(`CASE sender_id WHEN ${userId} THEN receiver.mssv  ELSE sender.mssv END`), 'like', `%${keyword}%`)
    .limit(limit)
    .offset(offset)
    .orderBy('friend_requests.id', 'desc')
    .select(raw(`CASE sender_id WHEN ${userId} THEN receiver.avatar_url  ELSE sender.avatar_url END as avatar_url`))
    .select(raw(`CASE sender_id WHEN ${userId} THEN receiver.full_name  ELSE sender.full_name END as full_name`))
    .select(raw(`CASE sender_id WHEN ${userId} THEN receiver_id  ELSE sender_id END as id`));

  const friends = friendObj.map((friend) => {
    let imgSign = getFullUrl(friend.avatar_url) || getFullUrl(process.env.DEFAULT_AVATAR);
    return {
      ...friend, avatar: imgSign,
    };
  });

  return friends;
};

exports.suggestUser = async ({
  keyword, offset, limit, userId,
}) => {
  const userSuggest = await User.query()
    .whereNot('id', userId)
    .where((builder) => builder.where('full_name', 'like', `%${keyword}%`)
      .orWhere('mssv', 'like', `%${keyword}%`))
    .withGraphFetched('meSendRequest')
    .modifyGraph('meSendRequest', (builder) => {
      builder.where('receiver_id', userId).select('id', 'status');
    })
    .withGraphFetched('meReceiveRequest')
    .modifyGraph('meReceiveRequest', (builder) => {
      builder.where('sender_id', userId).select('id', 'status');
    })
    .limit(limit)
    .offset(offset);

  const users = userSuggest.map((user) => {
    let imgSign = getFullUrl(user.avatar_url) || getFullUrl(process.env.DEFAULT_AVATAR);
    return {
      ...user, avatar: imgSign,
    };
  });

  return users;
};
