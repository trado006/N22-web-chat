/* eslint-disable import/no-self-import */
/* eslint-disable global-require */
const { Model } = require('objection');

class Messenger extends Model {
    static get tableName() {
        return 'messengers';
    }
}

module.exports = Messenger;