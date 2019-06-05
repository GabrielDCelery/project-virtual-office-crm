const host = require('./host');
const authentication = require('./authentication');
const api = require('./api');
const database = require('./database');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const {
  NODE_ENV,
  APP_PORT,
  DB_CLIENT,
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
  DB_CHARSET,
  DB_PORT,
  DB_USERS_HASH_ROUNDS,
  USER_JWT_SECRET,
  USER_JWT_EXPIRY
} = process.env;

class Config {
  constructor() {
    this.nodeEnv = NODE_ENV;
    this.host = host({
      APP_PORT
    });
    this.api = api({});
    this.authentication = authentication({
      USER_JWT_SECRET,
      USER_JWT_EXPIRY
    });
    this.database = database({
      DB_CLIENT,
      DB_USER,
      DB_HOST,
      DB_PASSWORD,
      DB_NAME,
      DB_CHARSET,
      DB_PORT,
      DB_USERS_HASH_ROUNDS
    });
  }
}

module.exports = new Config();