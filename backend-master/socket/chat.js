const { Message, Messenger } = require('../app/models');
const { getUser, getUserData } = require('./user');

exports.newMessage = async({ token, userId, message }) => {
    const me = await getUser(token);
    const user = getUserData(userId);
    if (!me) return false;

    // try {
    message = await Message.query().insert({
        sender_id: me.id,
        receiver_id: userId,
        content: message,
    });

    message = await Message.query().findById(message.id);

    meMessenger = await Messenger.query().patch({ last_msg: message.id })
        .where('me_id', me.id).where('partner_id', userId);
    partnerMessenger = await Messenger.query().patch({ last_msg: message.id, is_new: 1 })
        .where('me_id', userId).where('partner_id', me.id);

    if (user) {
        return { user, me, message };
    } else {
        return { me, message };
    }
};