const { LegalEntitiesVersion } = require('../../models');

exports.seed = async knex => {
  await knex(LegalEntitiesVersion.tableName).insert([
    {
      id: 1,
      legal_entity_id: 2,
      short_name: 'Chrono-Trigger',
      long_name: 'Chrono-Trigger',
      type: LegalEntitiesVersion.TYPES.LIMITED_LIABILITY_COMPANY,
      registration_id: '02-03-529212',
      tax_id: '41580371-1-42',
      permanent_address_id: 1,
      version: 0,
      version_start_at: new Date('2018-08-03T11:11:11'),
      version_end_at: new Date('2018-09-02T11:11:11')
    },
    {
      id: 2,
      legal_entity_id: 2,
      short_name: 'Chrono-Line',
      long_name: 'Chrono-Line',
      type: LegalEntitiesVersion.TYPES.LIMITED_LIABILITY_COMPANY,
      registration_id: '02-03-529212',
      tax_id: '41580371-1-42',
      permanent_address_id: 1,
      version: 1,
      version_start_at: new Date('2018-09-02T11:11:11'),
      version_end_at: new Date('2019-08-09T11:11:11')
    }
  ]);

  await knex.raw(
    `select setval('${LegalEntitiesVersion.tableName}_id_seq', max(id)) from ${LegalEntitiesVersion.tableName}`
  );
};
