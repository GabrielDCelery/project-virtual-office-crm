const { Model } = require('objection');

class MailsAuditTrails extends Model {
  static get tableName() {
    return 'mails_audit_trails';
  }

  static get TYPES() {
    return {
      MAIL_RECEIVED: 'mail received',
      MAIL_SAVED_TO_TEMPORARY_DATABASE: 'mail saved to temporary database',
      MAIL_COPIED_TO_CLOUD_SERVICE: 'mail copied to cloud service',
      MAIL_EMAILED_TO_LEGAL_ENTITY: 'mail emailed to legal entity'
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
          enum: [
            MailsAuditTrails.TYPES.MAIL_RECEIVED,
            MailsAuditTrails.TYPES.MAIL_SAVED_TO_TEMPORARY_DATABASE,
            MailsAuditTrails.TYPES.MAIL_COPIED_TO_CLOUD_SERVICE,
            MailsAuditTrails.TYPES.MAIL_EMAILED_TO_LEGAL_ENTITY
          ]
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

  $beforeInsert() {
    const date = new Date().toISOString();

    this.created_at = date;
    this.updated_at = date;
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = MailsAuditTrails;
