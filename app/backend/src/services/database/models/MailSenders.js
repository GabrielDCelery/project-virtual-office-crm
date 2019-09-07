const { Model } = require('objection');

class MailSenders extends Model {
  static get tableName() {
    return 'mail_senders';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: {
          type: 'integer'
        },
        sender_name_id: {
          type: 'integer'
        },
        address_id: {
          type: 'integer'
        }
      }
    };
  }

  static get relationMappings() {
    const Addresses = require('./Addresses');
    const Mails = require('./Mails');
    const MailSenderNames = require('./MailSenderNames');

    return {
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Addresses,
        join: {
          from: `${MailSenders.tableName}.address_id`,
          to: `${Addresses.tableName}.id`
        }
      },
      sender_name: {
        relation: Model.BelongsToOneRelation,
        modelClass: MailSenderNames,
        join: {
          from: `${MailSenders.tableName}.sender_name_id`,
          to: `${MailSenderNames.tableName}.id`
        }
      },
      mails: {
        relation: Model.HasManyRelation,
        modelClass: Mails,
        join: {
          from: `${MailSenders.tableName}.id`,
          to: `${Mails.tableName}.sender_id`
        }
      }
    };
  }
}

module.exports = MailSenders;
