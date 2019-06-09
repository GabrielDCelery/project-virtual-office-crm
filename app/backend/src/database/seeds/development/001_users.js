const { DB_TABLE_NAME_USERS } = require('../../constants');

exports.seed = async knex => {
  await knex(DB_TABLE_NAME_USERS).insert([{
    "id": 1,
    "email": "test@test.com",
    "password": "$2b$12$LTN3ZlKU7PLXiReDQ73ee.2olxwpNyuw4XkYjYUgFp9CLHfRBOUS2",
    "status": 1
  }, {
    "id": 2,
    "email": "test2@test.com",
    "password": "$2b$12$LTN3ZlKU7PLXiReDQ73ee.2olxwpNyuw4XkYjYUgFp9CLHfRBOUS2",
    "status": 0
  }, {
    "id": 3,
    "email": "test3@test.com",
    "password": "$2b$12$LTN3ZlKU7PLXiReDQ73ee.2olxwpNyuw4XkYjYUgFp9CLHfRBOUS2",
    "status": 2
  }]);

  await knex.raw(`select setval(\'${DB_TABLE_NAME_USERS}_id_seq\', max(id)) from ${DB_TABLE_NAME_USERS}`);
};