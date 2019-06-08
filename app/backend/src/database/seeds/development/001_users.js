const { DB_TABLE_NAME_USERS } = require('../../constants');

exports.seed = async knex => {
  await knex(DB_TABLE_NAME_USERS).insert([{
    "id": 1,
    "email": "test@test.com",
    "password": "$2b$12$LTN3ZlKU7PLXiReDQ73ee.2olxwpNyuw4XkYjYUgFp9CLHfRBOUS2"
  }]);

  await knex.raw(`select setval(\'${DB_TABLE_NAME_USERS}_id_seq\', max(id)) from ${DB_TABLE_NAME_USERS}`);
};

exports.data = [{
  "id": 1,
  "email": "test@test.com",
  "password": "$2b$12$LTN3ZlKU7PLXiReDQ73ee.2olxwpNyuw4XkYjYUgFp9CLHfRBOUS2"
}];