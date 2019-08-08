const {
  Addresses
} = require('../../models');

exports.seed = async knex => {
  const insertDate = new Date('2019-11-11T11:11:11');

  await knex(Addresses.tableName).insert([{
    "id": 1,
    "location_id": 1,
    "address_line_1": "Miklós u. 13.",
    "address_line_2": "VIII/42.",
    "created_at": insertDate,
    "updated_at": insertDate
  }, {
    "id": 2,
    "location_id": 1,
    "address_line_1": "Kiscelli utca 45.",
    "address_line_2": null,
    "created_at": insertDate,
    "updated_at": insertDate
  }, {
    "id": 3,
    "location_id": 3,
    "address_line_1": "Melencei u. 35-37.",
    "address_line_2": null,
    "created_at": insertDate,
    "updated_at": insertDate
  }, {
    "id": 4,
    "location_id": 4,
    "address_line_1": "József Attila u. 56.",
    "address_line_2": null,
    "created_at": insertDate,
    "updated_at": insertDate
  }, {
    "id": 5,
    "location_id": 2,
    "address_line_1": "Báthory utca 6-4.",
    "address_line_2": "3. emelet 12.",
    "created_at": insertDate,
    "updated_at": insertDate
  }]);

  await knex.raw(`select setval(\'${Addresses.tableName}_id_seq\', max(id)) from ${Addresses.tableName}`);
};