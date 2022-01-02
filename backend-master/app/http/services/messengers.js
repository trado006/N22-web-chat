const { FriendRequest, User, Messenger, Message } = require('../../models');
const friendRequestStatus = require('../../enums/friendRequestStatus');
const { getFullUrl } = require('../../helpers/image');
const { abort } = require('../../helpers/error');

exports.getMessengers = async(userId) => {
    const messengers = await Messenger.query().where('me_id', userId)
        .select('id', 'partner_id', 'is_new', 'last_msg');
    let data = [];
    for (const messenger of messengers) {
        let partner_id = messenger.partner_id;
        let item = {};
        item.messenger = JSON.parse(JSON.stringify(messenger));

        let userInfo = await User.query().findById(partner_id).select('full_name', 'avatar_url');
        userInfo.imgSign = process.env.PUBLIC_URL + (userInfo.avatar_url || process.env.DEFAULT_AVATAR);
        //console.log(userInfo);
        item.info = JSON.parse(JSON.stringify(userInfo));
        //console.log(data);
        if (messenger.last_msg != 0) {
            let last_msg = await Message.query().findById(messenger.last_msg)
                .select('content', 'sender_id', 'created_at');
            if (last_msg.sender_id == userId) last_msg.my = 1;
            else last_msg.my = 0;
            item.last_msg = JSON.parse(JSON.stringify(last_msg));
        }
        data.push(item);
    }
    return data;
};

exports.getMessenger = async(messengerId) => {
    const messenger = await Messenger.query().findById(messengerId)
        .select('id', 'me_id', 'partner_id', 'is_new', 'last_msg');
    let partner_id = messenger.partner_id;
    let userId = messenger.me_id;
    let item = {};
    item.messenger = JSON.parse(JSON.stringify(messenger));
    let userInfo = await User.query().findById(partner_id).select('full_name', 'avatar_url');
    userInfo.imgSign = process.env.PUBLIC_URL + (userInfo.avatar_url || process.env.DEFAULT_AVATAR);
    //console.log(userInfo);
    item.info = JSON.parse(JSON.stringify(userInfo));
    //console.log(data);
    if (messenger.last_msg != 0) {
        let last_msg = await Message.query().findById(messenger.last_msg)
            .select('content', 'sender_id', 'created_at');
        if (last_msg.sender_id == userId) last_msg.my = 1;
        else last_msg.my = 0;
        item.last_msg = JSON.parse(JSON.stringify(last_msg));
    }
    return item;
};

exports.resetMessenger = async({ friendId, userId, last_msg }) => {
    messenger = await Messenger.query().patch({ is_new: 0 })
        .where('me_id', userId).where('partner_id', friendId).where('last_msg', last_msg);
    return messenger;
}