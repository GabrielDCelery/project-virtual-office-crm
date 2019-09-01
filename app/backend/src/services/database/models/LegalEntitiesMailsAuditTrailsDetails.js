const { Model } = require('objection');

class LegalEntitiesMailsAuditTrailsDetails extends Model {
  static get tableName() {
    return 'legal_entities_mails_audit_trails_details';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        legal_entities_mails_audit_trail_id: {
          type: 'integer'
        },
        data: {
          type: 'json'
        }
      }
    };
  }
}

module.exports = LegalEntitiesMailsAuditTrailsDetails;
