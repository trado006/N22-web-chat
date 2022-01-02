const { Message, User } = require('../../models');
const { getFullUrl } = require('../../helpers/image');
const { abort } = require('../../helpers/error');

exports.getFriendMessages = async({ friendId, userId, last_msg }) => {
    var userInfo = await User.query().findById(friendId).select('id', 'full_name', 'avatar_url');

    if (!userInfo) abort('user not found');
    userInfo.avatar = getFullUrl(userInfo.avatar_url) || getFullUrl(process.env.DEFAULT_AVATAR);
    userInfo.partner_id = userInfo.id;
    delete(userInfo.avatar_url);
    delete(userInfo.id);
    userInfo = JSON.parse(JSON.stringify(userInfo));
    console.log(userInfo);
    messages = await Message.query().where('id', '<=', last_msg).andWhere(
            (builder) => builder.where((builder) => builder.where('sender_id', userId).andWhere('receiver_id', friendId))
            .orWhere((builder) => builder.where('sender_id', friendId).andWhere('receiver_id', userId))
        ).orderBy('id', 'asc')
        .select('id', 'content', 'sender_id', 'created_at');
    messages = messages.map(function(message) {
        if (message.sender_id == userId) message.my = 1;
        else message.my = 0;
        return message;
    })
    messages = JSON.parse(JSON.stringify(messages));
    return {
        ...userInfo,
        messages,
    };
};