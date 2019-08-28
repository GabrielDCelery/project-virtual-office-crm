const {
  AddressCities,
  AddressCountries,
  Addresses,
  LegalEntities,
  LegalEntitiesVersion,
  MailSenderNames,
  MailSenders,
  Users
} = require('../../models');

exports.seed = async knex => {
  await knex(Users.tableName).del();
  await knex(MailSenders.tableName).del();
  await knex(MailSenderNames.tableName).del();
  await knex(Addresses.tableName).del();
  await knex(AddressCities.tableName).del();
  await knex(AddressCountries.tableName).del();
  await knex(LegalEntitiesVersion.tableName).del();
  await knex(LegalEntities.tableName).del();
};