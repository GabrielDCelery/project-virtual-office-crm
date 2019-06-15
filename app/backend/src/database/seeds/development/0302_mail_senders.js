const { MailSenders } = require('../../models');

exports.seed = async knex => {
  await knex(MailSenders.tableName).insert([{
    "id": 1,
    "address_id": 1,
    "name_id": 1
  }, {
    "id": 2,
    "address_id": 1,
    "name_id": 2
  }, {
    "id": 3,
    "address_id": 2,
    "name_id": 4
  }, {
    "id": 4,
    "address_id": 3,
    "name_id": 9
  }, {
    "id": 5,
    "address_id": 4,
    "name_id": 4
  }]);

  await knex.raw(`select setval(\'${MailSenders.tableName}_id_seq\', max(id)) from ${MailSenders.tableName}`);
};