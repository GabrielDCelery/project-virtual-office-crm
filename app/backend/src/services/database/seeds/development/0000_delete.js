const {
  Users,
  AddressCountries,
  AddressCities,
  AddressLocations,
  Addresses,
  MailSenders,
  MailSenderNames
} = require('../../models');

exports.seed = async knex => {
  await knex(Users.tableName).del();
  await knex(MailSenders.tableName).del();
  await knex(MailSenderNames.tableName).del();
  await knex(Addresses.tableName).del();
  await knex(AddressLocations.tableName).del();
  await knex(AddressCities.tableName).del();
  await knex(AddressCountries.tableName).del();
};