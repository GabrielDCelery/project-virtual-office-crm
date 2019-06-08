'use strict';

const {
    ERROR_EMAIL_ALREADY_REGISTERED,
    ERROR_EMAIL_AND_PASSWORD_COMBINATION_INVALID
} = require('../constants');
const models = require('../models');

class Users {
    constructor(container) {
        this.dbResultWrapper = container.get('db.ResultWrapper');
    }

    async _register({ email, password }, { transaction }) {
        return await models.Users
            .query(transaction)
            .insert({
                email,
                password
            });
    }

    async _findByEmail({ email }, { transaction }) {
        const user = await models.Users
            .query(transaction)
            .first()
            .where({ email });

        return user || null;
    }

    async register({ email, password }, { transaction }) {
        const user = await this._findByEmail({ email }, { transaction });

        if (user) {
            return this.dbResultWrapper.return('fail')(ERROR_EMAIL_ALREADY_REGISTERED);
        }

        const newUser = await this._register({ email, password }, { transaction });

        return this.dbResultWrapper.return('success')(newUser);
    }

    async authenticate({ email, password }, { transaction }) {
        const user = await this._findByEmail({ email }, { transaction });

        if (!user || !await user.verifyPassword(password)) {
            return this.dbResultWrapper.return('fail')(ERROR_EMAIL_AND_PASSWORD_COMBINATION_INVALID);
        }

        return this.dbResultWrapper.return('success')({
            id: user.id,
            email,
            password
        });
    }
}

module.exports = Users;