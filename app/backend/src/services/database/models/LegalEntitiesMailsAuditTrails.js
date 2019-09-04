const { Model } = require('objection');

class LegalEntitiesMailsAuditTrails extends Model {
  static get tableName() {
    return 'legal_entities_mails_audit_trails';
  }

  static get TYPES() {
    return {
      MAIL_RECEIVED: 'mail received'
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: {
          type: 'integer'
        },
        legal_entities_mail_id: {
          type: 'integer'
        },
        event_type: {
          type: 'string',
          enum: [LegalEntitiesMailsAuditTrails.TYPES.MAIL_RECEIVED]
        },
        event_time: {
          type: 'date'
        }
      }
    };
  }

  static get relationMappings() {
    const LegalEntitiesMails = require('./LegalEntitiesMails');

    return {
      mail: {
        relation: Model.BelongsToOneRelation,
        modelClass: LegalEntitiesMails,
        join: {
          from: `${LegalEntitiesMailsAuditTrails.tableName}.legal_entities_mail_id`,
          to: `${LegalEntitiesMails.tableName}.id`
        }
      }
    };
  }
}

module.exports = LegalEntitiesMailsAuditTrails;
