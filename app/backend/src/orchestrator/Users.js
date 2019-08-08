const jwt = require('jsonwebtoken');
const config = globalRequire('config');

class Users {
  constructor(services) {
    this.services = services;
  }

  async verifyJwtToken(jwt) {
    let decoded = null;

    try {
      decoded = jwt.verify(jwt, config.authentication.userJwtSecret);
    } catch (err) {}

    return decoded;
  }

  async _signJwtToken({
    email
  }) {
    return jwt.sign({
      data: {
        email
      },
      exp: config.authentication.userJwtExpiry
    }, config.authentication.userJwtSecret);
  }

  async register({
    data
  }) {
    const {
      email,
      password
    } = data;
    const wrappedDBResult = await this.services.get('database').executeDBAction(
      'Users',
      'register', {
        data: {
          email,
          password
        },
        config: {}
      }
    );

    if (!wrappedDBResult.success) {
      return wrappedDBResult
    };

    return this.resultWrapper.return('success')({
      jwt: await this._signJwtToken({
        email
      })
    });
  }

  async authenticate({
    data
  }) {
    const {
      email,
      password
    } = data;
    const wrappedDBResult = await this.services.get('database').execute(
      'users',
      'authenticate', {
        data: {
          email,
          password
        },
        config: {}
      }
    );

    if (!wrappedDBResult.success) {
      return wrappedDBResult;
    };

    return this.resultWrapper.return('success')({
      jwt: await this._signJwtToken({
        email
      })
    });
  }
}

module.exports = Users;