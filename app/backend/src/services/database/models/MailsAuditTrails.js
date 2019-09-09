const { Model } = require('objection');

class MailsAuditTrails extends Model {
  static get tableName() {
    return 'mails_audit_trails';
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
        mail_id: {
          type: 'integer'
        },
        event_type: {
          type: 'string',
          enum: [MailsAuditTrails.TYPES.MAIL_RECEIVED]
        },
        event_time: {
          type: 'date'
        }
      }
    };
  }

  static get relationMappings() {
    const Mails = require('./Mails');

    return {
      mail: {
        relation: Model.BelongsToOneRelation,
        modelClass: Mails,
        join: {
          from: `${MailsAuditTrails.tableName}.mail_id`,
          to: `${Mails.tableName}.id`
        }
      }
    };
  }
}

module.exports = MailsAuditTrails;