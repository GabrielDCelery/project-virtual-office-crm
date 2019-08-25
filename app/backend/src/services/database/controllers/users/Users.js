const {
  DB_ERROR_EMAIL_ALREADY_REGISTERED,
  DB_ERROR_EMAIL_AND_PASSWORD_COMBINATION_INVALID,
  DB_ERROR_USER_INACTIVE,
  DB_ERROR_USER_SUSPENDED
} = require("../../constants");

class Users {
  constructor({
    models,
    helpers
  }) {
    this.models = models;
    this.helpers = helpers;
    this.register = this.register.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  async _register(email, password, transaction) {
    return this.models.Users
      .query(transaction)
      .insert({
        email,
        password,
        status: this.models.Users.STATUSES.INACTIVE
      });
  }

  async _findByEmail(email, transaction) {
    const user = await this.models.Users
      .query(transaction)
      .first()
      .where({
        email
      });

    return user || null;
  }

  async register({
    data: {
      email,
      password
    },
    transaction
  }) {
    const user = await this._findByEmail(email, transaction);

    if (user) {
      return this.helpers.wrapResult({
        type: "fail",
        service: "database",
        errors: [DB_ERROR_EMAIL_ALREADY_REGISTERED]
      });
    }

    const newUser = await this._register(email, password, transaction);

    return this.helpers.wrapResult({
      type: "success",
      service: "database",
      payload: newUser
    });
  }

  async authenticate({
    data: {
      email,
      password
    },
    transaction
  }) {
    const user = await this._findByEmail(email, transaction);

    if (!user || !await user.verifyPassword(password)) {
      return this.helpers.wrapResult({
        type: "fail",
        service: "database",
        errors: [DB_ERROR_EMAIL_AND_PASSWORD_COMBINATION_INVALID]
      });
    }

    if (user.status === this.models.Users.STATUSES.INACTIVE) {
      return this.helpers.wrapResult({
        type: "fail",
        service: "database",
        errors: [DB_ERROR_USER_INACTIVE]
      });
    }

    if (user.status === this.models.Users.STATUSES.SUSPENDED) {
      return this.helpers.wrapResult({
        type: "fail",
        service: "database",
        errors: [DB_ERROR_USER_SUSPENDED]
      });
    }

    return this.helpers.wrapResult({
      type: "success",
      service: "database",
      payload: {
        id: user.id
      }
    });
  }
}

module.exports = Users;