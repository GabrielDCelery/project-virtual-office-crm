const {
  DB_ERROR_EMAIL_ALREADY_REGISTERED,
  DB_ERROR_EMAIL_AND_PASSWORD_COMBINATION_INVALID,
  DB_ERROR_USER_INACTIVE,
  DB_ERROR_USER_SUSPENDED
} = require('../../constants');

class Users {
  constructor(models, scripts) {
    this.models = models;
    this.scripts = scripts;
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
    email,
    password
  }, {
    transaction
  }) {
    const user = await this._findByEmail(email, transaction);

    if (user) {
      return this.scripts.wrapResult('fail', DB_ERROR_EMAIL_ALREADY_REGISTERED);
    }

    const newUser = await this._register(email, password, transaction);

    return this.scripts.wrapResult('success', newUser);
  }

  async authenticate({
    email,
    password
  }, {
    transaction
  }) {
    const user = await this._findByEmail(email, transaction);

    if (!user || !await user.verifyPassword(password)) {
      return this.scripts.wrapResult('fail', DB_ERROR_EMAIL_AND_PASSWORD_COMBINATION_INVALID);
    }

    if (user.status === this.models.Users.STATUSES.INACTIVE) {
      return this.scripts.wrapResult('fail', DB_ERROR_USER_INACTIVE);
    }

    if (user.status === this.models.Users.STATUSES.SUSPENDED) {
      return this.scripts.wrapResult('fail', DB_ERROR_USER_SUSPENDED);
    }

    return this.scripts.wrapResult('success', {
      id: user.id
    });
  }
}

module.exports = Users;