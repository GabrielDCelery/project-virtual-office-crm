const { DB_TABLE_NAME_USERS } = require('../../constants');

exports.seed = async knex => {
  const dbName = DB_TABLE_NAME_USERS;

  await knex(dbName).insert([{
    "id": 1,
    "email": "test@test.com",
    "password": "test"
  }]);

  await knex.raw(`select setval(\'${dbName}_id_seq\', max(id)) from ${dbName}`);
};