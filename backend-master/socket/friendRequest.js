const { getUserData, getUser } = require('./user');
const { FriendRequest, Messenger } = require('../app/models');
const friendRequestStatus = require('../app/enums/friendRequestStatus');
const { getFullUrl } = require('../app/helpers/image')
const { getMessenger } = require('../app/http/services/messengers');
exports.newFriendRequest = async({ token, userId }) => {
    const me = await getUser(token);
    const user = getUserData(userId);

    if (me) {
        let [requestId] = await FriendRequest.knexQuery()
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

exports.acceptFriendRequest = async({ token, userId }) => {
    const me = await getUser(token);
    const user = getUserData(userId);

    if (me) {
        const friendRequest = await FriendRequest.query()
            .where('sender_id', userId)
            .where('receiver_id', me.id)
            .first();

        if (friendRequest /*&& friendRequest.status === friendRequestStatus.REQUEST*/ ) {
            await FriendRequest.query().deleteById(friendRequest.id);
            await FriendRequest.query().delete().where('sender_id', me.id).where('receiver_id', userId);
            meMessenger = await Messenger.query().insert({ me_id: me.id, partner_id: userId });
            meMessenger = await getMessenger(meMessenger.id);
            partnerMessenger = await Messenger.query().insert({ me_id: userId, partner_id: me.id });
            partnerMessenger = await getMessenger(partnerMessenger.id);
            console.log(meMessenger);
            console.log(partnerMessenger);
            if (user) {
                return { user, me, meMessenger, partnerMessenger };
            }
        } else {
            return false;
        }

        return true;
    }
    return false;
};