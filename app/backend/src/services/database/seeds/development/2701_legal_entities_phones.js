const { LegalEntities, Phones } = require('../../models');

exports.seed = async knex => {
  const tableName = `${LegalEntities.tableName}_${Phones.tableName}`;

  await knex(tableName).insert([
    {
      legal_entity_id: 1,
      phone_id: 1
    },
    {
      legal_entity_id: 2,
      phone_id: 2
    },
    {
      legal_entity_id: 1,
      phone_id: 2
    }
  ]);
};
