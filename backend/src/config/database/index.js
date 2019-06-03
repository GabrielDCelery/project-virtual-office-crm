const connection = require('./connection');
const models = require('./models');

module.exports = ({
  DB_CLIENT,
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
  DB_CHARSET,
  DB_PORT,
  DB_USERS_HASH_ROUNDS
}) => ({
  connection: connection({
    DB_CLIENT,
    DB_USER,
    DB_HOST,
    DB_PASSWORD,
    DB_NAME,
    DB_CHARSET,
    DB_PORT
  }),
  models: models({
    DB_USERS_HASH_ROUNDS
  })
});