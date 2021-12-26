const { getUserData, getUser } = require('./user');
const { FriendRequest } = require('../app/models');
const friendRequestStatus = require('../app/enums/friendRequestStatus');
const { getFullUrl } = require('../app/helpers/image')
exports.newFriendRequest = async ({ token, userId }) => {
  const me = await getUser(token);
  const user = getUserData(userId);

  if (me) {
    let [ requestId ] = await FriendRequest.knexQuery()
      .insert({ sender_id: me.id, receiver_id: userId, status: friendRequestStatus.REQUEST })
      .onConflict(['sender_id', 'receiver_id'])
      .merge();
    
    if (user) {
			let friendRequest = await FriendRequest.query()
			.findById(requestId)
			.withGraphFetched('sender')
			.modifyGraph('sender', (builder) => {
				builder.select('id', 'full_name', 'avatar_url');
			});
			friendRequest.sender.avatar = getFullUrl(friendRequest.sender.avatar_url) || getFullUrl(process.env.DEFAULT_AVATAR)
	
			user.friendRequest = friendRequest;
			console.log("friend request ", friendRequest);
      return { user, me };
    }

    return true;
  }
  return false;
};

exports.acceptFriendRequest = async ({ token, userId }) => {
  const me = await getUser(token);
  const user = getUserData(userId);

  if (me) {
    const friendRequest = await FriendRequest.query()
      .where('sender_id', userId)
      .where('receiver_id', me.id)
      .first();

    if (friendRequest && friendRequest.status === friendRequestStatus.REQUEST) {
      await friendRequest.$query().update({
        status: friendRequestStatus.ACCEPTED,
      });
    } else {
      return false;
    }

    if (user) {
      return { user, me };
    }

    return true;
  }
  return false;
};
