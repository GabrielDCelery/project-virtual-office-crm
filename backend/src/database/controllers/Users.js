'use strict';

const {
    ERROR_EMAIL_ALREADY_REGISTERED,
    ERROR_EMAIL_AND_PASSWORD_COMBINATION_INVALID
} = require('../constants');
const models = require('../models');
const { ResultWrapper } = globalRequire('./helperClasses');

class Users {
    constructor(container) {
        this.resultWrapper = container.get(ResultWrapper);
    }

    async _register(email, password, transaction) {
        return await models.Users
            .query(transaction)
            .insert({
                email,
                password
            });
    }

    async _findByEmail(email, transaction) {
        return models.Users
            .query(transaction)
            .first()
            .where({ email });
    }

    async register({ email, password }, { transaction }) {
        const user = await this._findByEmail(email, transaction);

        if (user) {
            return this.resultWrapper.return('fail')(ERROR_EMAIL_ALREADY_REGISTERED);
        }

        const newUser = await this._register(email, password, transaction);

        return this.resultWrapper.return('success')(newUser);
    }

    async authenticate({ email, password }, { transaction }) {
        const user = await this._findByEmail(email, transaction);

        if (!user || !await user.verifyPassword(password)) {
            return this.resultWrapper.return('fail')(ERROR_EMAIL_AND_PASSWORD_COMBINATION_INVALID);
        }

        return this.resultWrapper.return('success')({
            id: user.id,
            email,
            password
        });
    }
}

module.exports = Users;