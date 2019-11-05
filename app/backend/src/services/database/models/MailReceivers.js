const { Model } = require('objection');

class MailReceivers extends Model {
  static get tableName() {
    return 'mail_receivers';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: {
          type: 'integer'
        },
        receiver_name_id: {
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
    const MailReceiverNames = require('./MailReceiverNames');

    return {
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Addresses,
        join: {
          from: `${MailReceivers.tableName}.address_id`,
          to: `${Addresses.tableName}.id`
        }
      },
      receiver_name: {
        relation: Model.BelongsToOneRelation,
        modelClass: MailReceiverNames,
        join: {
          from: `${MailReceivers.tableName}.receiver_name_id`,
          to: `${MailReceiverNames.tableName}.id`
        }
      }
    };
  }
}

module.exports = MailReceivers;
