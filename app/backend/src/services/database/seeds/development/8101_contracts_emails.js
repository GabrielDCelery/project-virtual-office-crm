const { Contracts } = require('../../models');
const { Emails } = require('../../models');

exports.seed = async knex => {
  await knex(`${Contracts.tableName}_${Emails.tableName}`).insert([
    {
      contract_id: 1,
      email_id: 1
    }
  ]);
};
