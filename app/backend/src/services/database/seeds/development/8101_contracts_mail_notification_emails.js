const { Contracts } = require('../../models');
const { Emails } = require('../../models');

exports.seed = async knex => {
  await knex(
    `${Contracts.tableName}_mail_notification_${Emails.tableName}`
  ).insert([
    {
      contract_id: 1,
      email_id: 1
    }
  ]);
};
