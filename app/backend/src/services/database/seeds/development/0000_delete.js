const {
  Addresses,
  Cities,
  Countries,
  Documents,
  DocumentsCloud,
  DocumentsTemporary,
  Emails,
  LegalEntities,
  LegalEntitiesVersion,
  MailSenderNames,
  MailSenders,
  MailSubjects,
  Mails,
  MailsAuditTrails,
  MailsPendingActions,
  NaturalPeople,
  NaturalPeopleVersion,
  Phones,
  Users
} = require('../../models');

exports.seed = async knex => {
  await knex(NaturalPeopleVersion.tableName).del();
  await knex(NaturalPeople.tableName).del();
  await knex(`${LegalEntities.tableName}_${Phones.tableName}`).del();
  await knex(`${LegalEntities.tableName}_${Emails.tableName}`).del();
  await knex(MailsPendingActions.tableName).del();
  await knex(MailsAuditTrails.tableName).del();
  await knex(Mails.tableName).del();
  await knex(LegalEntitiesVersion.tableName).del();
  await knex(LegalEntities.tableName).del();
  await knex(Users.tableName).del();
  await knex(MailSubjects.tableName).del();
  await knex(MailSenders.tableName).del();
  await knex(MailSenderNames.tableName).del();
  await knex(Addresses.tableName).del();
  await knex(DocumentsTemporary.tableName).del();
  await knex(DocumentsCloud.tableName).del();
  await knex(Documents.tableName).del();
  await knex(Emails.tableName).del();
  await knex(Phones.tableName).del();
  await knex(Cities.tableName).del();
  await knex(Countries.tableName).del();
};
