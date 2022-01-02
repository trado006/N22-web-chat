const { raw } = require('objection');

const { FriendRequest, User, Messenger } = require('../../models');
const friendRequestStatus = require('../../enums/friendRequestStatus');
const { getFullUrl } = require('../../helpers/image');
const { abort } = require('../../helpers/error');

exports.getFriends = async(userId) => {
    const previewFriendIds = await Messenger.query().select('partner_id').where('me_id', userId);
    const friendIds = previewFriendIds.map((messenger) => messenger.partner_id);
    total = friendIds.length;
    const previewFriendInfos = await User.query()
        .whereIn('id', friendIds)
        .select('full_name', 'avatar_url', 'id');
    const friends = previewFriendInfos.map((friend) => {
        let imgSign = process.env.PUBLIC_URL + (friend.avatar_url || process.env.DEFAULT_AVATAR);
        return {
            ...friend,
            avatar: imgSign,
        };
    });
    return { friends: { total, data: friends } };
};

exports.myRequest = async({ userId }) => {
    const friendRequest = await FriendRequest.query()
        .where('receiver_id', userId)
        .where('status', friendRequestStatus.REQUEST)
        .withGraphFetched('sender')
        .modifyGraph('sender', (builder) => {
            builder.select('id', 'full_name', 'avatar_url');
        })
        .orderBy('id', 'desc');

    friendRequest.forEach((req) => {
        if (req.sender) {
            req.sender.avatar = getFullUrl(req.sender.avatar_url) || getFullUrl(process.env.DEFAULT_AVATAR);
        }
    });
    return { friendRequest };
};

exports.addFriend = async({ userId, friendId }) => {
    await FriendRequest.knexQuery()
        .insert({ sender_id: userId, receiver_id: friendId, status: friendRequestStatus.REQUEST })
        .onConflict(['sender_id', 'receiver_id'])
        .merge();
};

exports.acceptFriendRequest = async({ userId, friendRequestId }) => {
    const friendRequest = await FriendRequest.query().findById(friendRequestId);

    if (friendRequest.receiver_id === userId) {
        await friendRequest.$query().update({
            status: friendRequestStatus.ACCEPTED,
        });
    } else {
        abort('You not have permission');
    }
};

exports.rejectFriendRequest = async({ userId, friendRequestId }) => {
    // try {
    await FriendRequest.query().deleteById(friendRequestId);
    // } catch (error) {
    //     console.log(error);
    //     return abort(400, 'friend request id not valid');
    // }
}