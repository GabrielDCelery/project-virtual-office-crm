const { Model } = require('objection');

class Addresses extends Model {
  static get tableName() {
    return 'addresses';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        location_id: { type: 'integer' },
        address_line_1: { type: 'string' },
        address_line_2: { type: 'string' },
        created_at: { type: 'string', format: 'date-time', readOnly: true },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  static get relationMappings() {
    const AddressLocations = require('./AddressLocations');
    const { MailSenders } = require('../mails');

    return {
      location: {
        relation: Model.BelongsToOneRelation,
        modelClass: AddressLocations,
        join: {
          from: `${Addresses.tableName}.location_id`,
          to: `${AddressLocations.tableName}.id`
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