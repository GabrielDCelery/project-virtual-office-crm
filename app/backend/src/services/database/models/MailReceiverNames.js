const { Model } = require('objection');

class MailReceiverNames extends Model {
  static get tableName() {
    return 'mail_receiver_names';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string'
        }
      }
    };
  }

  static get relationMappings() {
    const MailReceivers = require('./MailReceivers');

    return {
      mail_receivers: {
        relation: Model.HasManyRelation,
        modelClass: MailReceivers,
        join: {
          from: `${MailReceiverNames.tableName}.id`,
          to: `${MailReceivers.tableName}.receiver_name_id`
        }
      }
    };
  }
}

module.exports = MailReceiverNames;
