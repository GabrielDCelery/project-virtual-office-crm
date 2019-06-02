const host = require('./host');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

class Config {
  constructor() {
    this.nodeEnv = process.env.NODE_ENV;
    this.host = host(process.env);
  }
}

module.exports = new Config();