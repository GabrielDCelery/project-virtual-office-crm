'use strict';

const config = globalRequire('config');
const { Model } = require('objection');
const Password = require('objection-password')({ rounds: config.database.models.users.hashRounds });
const { DB_TABLE_NAME_USERS } = require('../constants');

class Users extends Password(Model) {
    static get tableName() {
        return DB_TABLE_NAME_USERS;
    }

    async $beforeInsert(context) {
        await super.$beforeInsert(context);

        const date = new Date().toISOString();

        this.created_at = date;
        this.updated_at = date;
    }

    async $beforeUpdate(context) {
        await super.$beforeInsert(context);

        this.updated_at = new Date().toISOString();
    }
}

module.exports = Users;