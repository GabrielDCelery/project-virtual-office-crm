const { Model } = require('objection');

class MailsPendingActions extends Model {
  static get tableName() {
    return 'mails_pending_actions';
  }

  static get TYPES() {
    return {
      SEND_EMAIL_NOTIFICATION: 'send email notification'
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
        action: {
          type: 'string',
          enum: [MailsPendingActions.TYPES.SEND_EMAIL_NOTIFICATION]
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
          from: `${MailsPendingActions.tableName}.mail_id`,
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

module.exports = MailsPendingActions;
