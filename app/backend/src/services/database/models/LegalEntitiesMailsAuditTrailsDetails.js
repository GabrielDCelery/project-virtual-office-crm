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

  static get relationMappings() {
    const LegalEntitiesMailsAuditTrails = require('./LegalEntitiesMailsAuditTrails');

    return {
      audit_trail: {
        relation: Model.BelongsToOneRelation,
        modelClass: LegalEntitiesMailsAuditTrails,
        join: {
          from: `${LegalEntitiesMailsAuditTrailsDetails.tableName}.legal_entities_mails_audit_trail_id`,
          to: `${LegalEntitiesMailsAuditTrails.tableName}.id`
        }
      }
    };
  }
}

module.exports = LegalEntitiesMailsAuditTrailsDetails;
