const { DB_TABLE_NAME_USERS } = require('../../constants');

exports.seed = async knex => {
  await knex(DB_TABLE_NAME_USERS).del();
};