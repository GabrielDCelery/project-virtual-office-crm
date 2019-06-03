const jwt = require('jsonwebtoken');
const { executeDBAction } = globalRequire('database');
const { ResultWrapper } = globalRequire('./helperClasses');
const config = globalRequire('config');

class Users {
  constructor(container) {
    this.resultWrapper = container.get(ResultWrapper);
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
    const wrappedDBResult = await executeDBAction('Users')('register')({ email, password });

    if (!wrappedDBResult.success) {
      return wrappedDBResult;
    }

    return this.resultWrapper.return('success')({
      jwt: await this.signJwtToken({ email })
    });
  }

  async authenticate({ email, password }) {
    const wrappedDBResult = await executeDBAction('Users')('authenticate')({ email, password });
    if (!wrappedDBResult.success) {
      return wrappedDBResult;
    }

    return this.resultWrapper.return('success')({
      jwt: await this.signJwtToken({ email })
    });
  }
}

module.exports = Users;