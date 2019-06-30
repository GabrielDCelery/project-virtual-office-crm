const { AddressCountries } = require('../../models');

exports.seed = async knex => {
  await knex(AddressCountries.tableName).insert(require('../data/address_countries'));

  await knex.raw(`select setval(\'${AddressCountries.tableName}_id_seq\', max(id)) from ${AddressCountries.tableName}`);
};