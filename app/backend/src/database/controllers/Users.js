'use strict';

const {
    DB_ERROR_EMAIL_ALREADY_REGISTERED,
    DB_ERROR_EMAIL_AND_PASSWORD_COMBINATION_INVALID,
    DB_ERROR_USER_INACTIVE,
    DB_ERROR_USER_SUSPENDED,
    DB_MODELS_USERS_STATUS_INACTIVE,
    DB_MODELS_USERS_STATUS_SUSPENDED
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
                password,
                status: DB_MODELS_USERS_STATUS_INACTIVE
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
            return this.dbResultWrapper.return('fail')(DB_ERROR_EMAIL_ALREADY_REGISTERED);
        }

        const newUser = await this._register({ email, password }, { transaction });

        return this.dbResultWrapper.return('success')(newUser);
    }

    async authenticate({ email, password }, { transaction }) {
        const user = await this._findByEmail({ email }, { transaction });

        if (!user || !await user.verifyPassword(password)) {
            return this.dbResultWrapper.return('fail')(DB_ERROR_EMAIL_AND_PASSWORD_COMBINATION_INVALID);
        }

        if (user.status === DB_MODELS_USERS_STATUS_INACTIVE) {
            return this.dbResultWrapper.return('fail')(DB_ERROR_USER_INACTIVE);
        }

        if (user.status === DB_MODELS_USERS_STATUS_SUSPENDED) {
            return this.dbResultWrapper.return('fail')(DB_ERROR_USER_SUSPENDED);
        }

        return this.dbResultWrapper.return('success')({
            id: user.id
        });
    }
}

module.exports = Users;