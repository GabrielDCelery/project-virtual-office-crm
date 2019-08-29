const {
  LegalEntities
} = require("../../models");

exports.seed = async knex => {
  await knex(LegalEntities.tableName).insert([{
    "id": 1,
    "short_name": "Bacz Invest",
    "long_name": "Bacz Invest Elektro Technikai",
    "type": LegalEntities.TYPES.KFT,
    "registration_id": "03-01-131101",
    "tax_id": "13781174-1-42",
    "permanent_address_id": 1,
    "version": 0,
    "version_start_at": new Date("2019-08-01T11:11:11")
  }, {
    "id": 2,
    "short_name": "Chrono-Line",
    "long_name": "Chrono-Line",
    "type": LegalEntities.TYPES.KFT,
    "registration_id": "02-03-529212",
    "tax_id": "31580371-1-42",
    "permanent_address_id": 1,
    "version": 2,
    "version_start_at": new Date("2019-08-09T11:11:11")
  }]);

  await knex.raw(`select setval(\'${LegalEntities.tableName}_id_seq\', max(id)) from ${LegalEntities.tableName}`);
};