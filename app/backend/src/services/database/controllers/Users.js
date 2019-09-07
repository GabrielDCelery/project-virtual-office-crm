const {
  DB_ERROR_NAME_CONTROLLER_ERROR,
  DB_ERROR_MESSAGE_EMAIL_ALREADY_REGISTERED,
  DB_ERROR_MESSAGE_EMAIL_AND_PASSWORD_COMBINATION_INVALID,
  DB_ERROR_MESSAGE_USER_INACTIVE,
  DB_ERROR_MESSAGE_USER_SUSPENDED
} = require('../constants');

class Users {
  constructor({ models, nodeModules }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.register = this.register.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  async _register(email, password, transaction) {
    return this.models.Users.query(transaction).insert({
      email,
      password,
      status: this.models.Users.STATUSES.INACTIVE
    });
  }

  async _findByEmail(email, transaction) {
    const user = await this.models.Users.query(transaction)
      .first()
      .where({
        email
      });

    return user || null;
  }

  async register({ email, password, transaction }) {
    const { VError } = this.nodeModules.verror;
    const user = await this._findByEmail(email, transaction);

    if (user) {
      return Promise.reject(
        new VError(
          {
            name: DB_ERROR_NAME_CONTROLLER_ERROR,
            info: {
              email,
              password
            }
          },
          DB_ERROR_MESSAGE_EMAIL_ALREADY_REGISTERED
        )
      );
    }

    return await this._register(email, password, transaction);
  }

  async authenticate({ email, password, transaction }) {
    const { VError } = this.nodeModules.verror;
    const user = await this._findByEmail(email, transaction);

    if (!user || !(await user.verifyPassword(password))) {
      return Promise.reject(
        new VError(
          {
            name: DB_ERROR_NAME_CONTROLLER_ERROR,
            info: {
              email,
              password
            }
          },
          DB_ERROR_MESSAGE_EMAIL_AND_PASSWORD_COMBINATION_INVALID
        )
      );
    }

    if (user.status === this.models.Users.STATUSES.INACTIVE) {
      return Promise.reject(
        new VError(
          {
            name: DB_ERROR_NAME_CONTROLLER_ERROR,
            info: {
              email,
              password
            }
          },
          DB_ERROR_MESSAGE_USER_INACTIVE
        )
      );
    }

    if (user.status === this.models.Users.STATUSES.SUSPENDED) {
      return Promise.reject(
        new VError(
          {
            name: DB_ERROR_NAME_CONTROLLER_ERROR,
            info: {
              email,
              password
            }
          },
          DB_ERROR_MESSAGE_USER_SUSPENDED
        )
      );
    }

    return {
      id: user.id
    };
  }
}

module.exports = Users;
