const jwt = require('jsonwebtoken');
const database = globalRequire('database');
const config = globalRequire('config');
const { TYPEDI_NAMESPACE_SERVICES } = globalRequire('constants');

class Users {
  constructor(container) {
    this.resultWrapper = container.get(`${TYPEDI_NAMESPACE_SERVICES}.ResultWrapper`);
  }

  async verifyJwtToken(jwt) {
    let decoded = null;

    try {
      decoded = jwt.verify(jwt, config.authentication.userJwtSecret);
    } catch (err) { }

    return decoded;
  }

  async signJwtToken({ email }) {
    return jwt.sign({
      data: { email },
      exp: config.authentication.userJwtExpiry
    }, config.authentication.userJwtSecret);
  }

  async register({ email, password }) {
    const wrappedDBResult = await database.executeDBAction(
      'Users',
      'register',
      { data: { email, password }, config: {} }
    );

    if (!wrappedDBResult.success) { return wrappedDBResult };

    return this.resultWrapper.return('success')({
      jwt: await this.signJwtToken({ email })
    });
  }

  async authenticate({ email, password }) {
    const wrappedDBResult = await database.executeDBAction(
      'Users',
      'authenticate',
      { data: { email, password }, config: {} }
    );

    if (!wrappedDBResult.success) { return wrappedDBResult };

    return this.resultWrapper.return('success')({
      jwt: await this.signJwtToken({ email })
    });
  }
}

module.exports = Users;