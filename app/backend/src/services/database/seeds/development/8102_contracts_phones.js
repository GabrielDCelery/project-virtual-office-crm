const { Contracts } = require('../../models');
const { Phones } = require('../../models');

exports.seed = async knex => {
  await knex(`${Contracts.tableName}_${Phones.tableName}`).insert([
    {
      contract_id: 1,
      phone_id: 1
    }
  ]);
};
