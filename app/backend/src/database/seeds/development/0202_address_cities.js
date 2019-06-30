const { AddressCities } = require('../../models');

exports.seed = async knex => {
  await knex(AddressCities.tableName).insert(require('../data/address_cities'));

  await knex.raw(`select setval(\'${AddressCities.tableName}_id_seq\', max(id)) from ${AddressCities.tableName}`);
};