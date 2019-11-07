const { Contracts } = require('../../models');

exports.seed = async knex => {
  await knex(`${Contracts.tableName}_mail_receivers`).insert([
    {
      contract_id: 1,
      mail_receiver_id: 4
    }
  ]);
};
