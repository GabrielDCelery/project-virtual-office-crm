const {
  AddressCities,
  AddressCountries,
  Addresses,
  Documents,
  DocumentsDetails,
  LegalEntities,
  LegalEntitiesMails,
  LegalEntitiesMailsAuditTrails,
  LegalEntitiesVersion,
  MailSenderNames,
  MailSenders,
  MailSubjects,
  Users
} = require('../../models');

exports.seed = async knex => {
  await knex(LegalEntitiesMailsAuditTrails.tableName).del();
  await knex(LegalEntitiesMails.tableName).del();
  await knex(LegalEntitiesVersion.tableName).del();
  await knex(LegalEntities.tableName).del();
  await knex(Users.tableName).del();
  await knex(MailSubjects.tableName).del();
  await knex(MailSenders.tableName).del();
  await knex(MailSenderNames.tableName).del();
  await knex(Addresses.tableName).del();
  await knex(AddressCities.tableName).del();
  await knex(AddressCountries.tableName).del();
  await knex(DocumentsDetails.tableName).del();
  await knex(Documents.tableName).del();
};