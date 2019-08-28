const {
  LegalEntities
} = require('../../models');

exports.seed = async knex => {
  const insertDate = new Date('2019-11-11T11:11:11');

  await knex(LegalEntities.tableName).insert([{
    "id": 1,
    "name": "foobar",
    "type": LegalEntities.TYPES.KFT,
    "registration_id": "foo",
    "tax_id": "bar",
    "permanent_address_id": 1,
    "version": 0,
    "version_start_at": insertDate,
    "version_end_at": insertDate,
    "created_at": insertDate,
    "updated_at": insertDate
  }]);

  await knex.raw(`select setval(\'${LegalEntities.tableName}_id_seq\', max(id)) from ${LegalEntities.tableName}`);
};