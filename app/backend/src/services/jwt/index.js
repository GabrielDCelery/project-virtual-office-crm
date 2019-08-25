const jwt = require('jsonwebtoken');
const config = require('./config');

class JWT {
  constructor() {
    this.helpers = null;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.execute = this.execute.bind(this);
  }

  _initialize({
    secret,
    expiry
  }) {
    this.verify = async jwt => {
      let decoded = null;

      try {
        decoded = jwt.verify(jwt, secret);
      } catch (err) {}

      return decoded;
    };
    this.sign = async value => {
      return jwt.sign({
        data: value,
        exp: expiry
      }, secret);
    };
  }

  async start({
    environmentVariables,
    helpers
  }) {
    if (this.initialized) {
      throw new Error('Tried to initialize the redis connection twice!');
    }

    this.helpers = helpers;
    this._initialize(config(environmentVariables));
    this.initialized = true;
  }

  async stop() {
    this.initialized = false;
  }

  async execute(methodName, value) {
    try {
      return this.helpers.wrapResult('success', await this[methodName](value));
    } catch (error) {
      return this.helpers.wrapResult('fail', error.message);
    }
  }
}

module.exports = new JWT();