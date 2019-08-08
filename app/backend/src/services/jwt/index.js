const jwt = require('jsonwebtoken');
const config = require('./config');

class JWT {
  constructor() {
    this.scripts = null;
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
    scripts
  }) {
    if (this.initialized) {
      throw new Error('Tried to initialize the redis connection twice!');
    }

    this.scripts = scripts;
    this._initialize(config(environmentVariables));
    this.initialized = true;
  }

  async stop() {
    this.initialized = false;
  }

  async execute(methodName, value) {
    try {
      return this.scripts.wrapResult('success', await this[methodName](value));
    } catch (error) {
      return this.scripts.wrapResult('fail', error.message);
    }
  }
}

module.exports = new JWT();