const host = require('./host');
const authentication = require('./authentication');
const api = require('./api');
const database = require('./database');
const redis = require('./redis');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const {
  NODE_ENV,
  BACKEND_APP_PORT,
  DB_CLIENT,
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
  DB_CHARSET,
  DB_PORT,
  REDIS_HOST,
  REDIS_PORT,
  DB_USERS_HASH_ROUNDS,
  USER_JWT_SECRET,
  USER_JWT_EXPIRY
} = process.env;

class Config {
  constructor() {
    this.nodeEnv = NODE_ENV;
    this.host = host({
      BACKEND_APP_PORT
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
    this.redis = redis({
      REDIS_HOST,
      REDIS_PORT
    });
  }
}

module.exports = new Config();