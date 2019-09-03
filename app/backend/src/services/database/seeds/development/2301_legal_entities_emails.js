const { LegalEntities, Emails } = require('../../models');

exports.seed = async knex => {
  const tableName = `${LegalEntities.tableName}_${Emails.tableName}`;

  await knex(tableName).insert([
    {
      legal_entity_id: 1,
      email_id: 1
    },
    {
      legal_entity_id: 2,
      email_id: 2
    },
    {
      legal_entity_id: 1,
      email_id: 2
    }
  ]);
};
