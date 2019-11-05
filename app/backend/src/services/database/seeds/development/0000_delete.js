const {
  Addresses,
  Cities,
  Contracts,
  Countries,
  Documents,
  DocumentsCloud,
  DocumentsTemporary,
  Emails,
  HistoryManyToManyChanges,
  HistoryRecordChanges,
  LegalEntities,
  MailSenderNames,
  MailSenders,
  MailSubjects,
  Mails,
  MailsAuditTrails,
  MailsPendingActions,
  NaturalPeople,
  Phones,
  Users
} = require('../../models');

exports.seed = async knex => {
  await knex(`${Contracts.tableName}_${Phones.tableName}`).del();
  await knex(`${Contracts.tableName}_${Emails.tableName}`).del();
  await knex(Contracts.tableName).del();
  await knex(NaturalPeople.tableName).del();
  await knex(MailsPendingActions.tableName).del();
  await knex(MailsAuditTrails.tableName).del();
  await knex(Mails.tableName).del();
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
  await knex(HistoryManyToManyChanges.tableName).del();
  await knex(HistoryRecordChanges.tableName).del();
};
