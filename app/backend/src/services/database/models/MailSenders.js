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
        name_id: {
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
    const LegalEntitiesMails = require('./LegalEntitiesMails');
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
      name: {
        relation: Model.BelongsToOneRelation,
        modelClass: MailSenderNames,
        join: {
          from: `${MailSenders.tableName}.name_id`,
          to: `${MailSenderNames.tableName}.id`
        }
      },
      legal_entities_mails: {
        relation: Model.HasManyRelation,
        modelClass: LegalEntitiesMails,
        join: {
          from: `${MailSenders.tableName}.id`,
          to: `${LegalEntitiesMails.tableName}.sender_id`
        }
      }
    };
  }
}

module.exports = MailSenders;
