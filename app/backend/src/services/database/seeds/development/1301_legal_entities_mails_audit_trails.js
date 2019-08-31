const {
  LegalEntitiesMailsAuditTrails
} = require("../../models");

exports.seed = async knex => {
  await knex(LegalEntitiesMailsAuditTrails.tableName).insert([{
    "id": 1,
    "legal_entities_mail_id": 1,
    "event_type": LegalEntitiesMailsAuditTrails.TYPES.MAIL_RECEIVED,
    "event_time": new Date("2019-11-11T11:11:11.000Z"),
    "created_at": new Date("2019-11-11T11:11:11.000Z"),
    "updated_at": new Date("2019-11-11T11:11:11.000Z")
  }]);

  await knex.raw(`select setval(\'${LegalEntitiesMailsAuditTrails.tableName}_id_seq\', max(id)) from ${LegalEntitiesMailsAuditTrails.tableName}`);
};