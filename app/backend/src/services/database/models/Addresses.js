const {
  Model
} = require('objection');

class Addresses extends Model {
  static get tableName() {
    return 'addresses';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: {
          type: 'integer'
        },
        postcode: {
          type: 'string'
        },
        city_id: {
          type: 'integer'
        },
        long_street: {
          type: 'string'
        },
        created_at: {
          type: 'string',
          format: 'date-time'
        },
        updated_at: {
          type: 'string',
          format: 'date-time'
        }
      }
    };
  }

  static get relationMappings() {
    const AddressCities = require('./AddressCities');
    const MailSenders = require('./MailSenders');

    return {
      city: {
        relation: Model.BelongsToOneRelation,
        modelClass: AddressCities,
        join: {
          from: `${Addresses.tableName}.city_id`,
          to: `${AddressCities.tableName}.id`
        }
      },
      mail_senders: {
        relation: Model.HasManyRelation,
        modelClass: MailSenders,
        join: {
          from: `${Addresses.tableName}.id`,
          to: 'mail_senders.address_id'
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

module.exports = Addresses;