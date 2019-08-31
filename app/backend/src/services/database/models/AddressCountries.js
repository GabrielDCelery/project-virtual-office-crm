const {
  Model
} = require('objection');

class AddressCountries extends Model {
  static get tableName() {
    return 'address_countries';
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
        },
        short_name: {
          type: 'string'
        }
      }
    };
  }

  static get relationMappings() {
    const AddressCities = require('./AddressCities');

    return {
      cities: {
        relation: Model.HasManyRelation,
        modelClass: AddressCities,
        join: {
          from: `${AddressCountries.tableName}.id`,
          to: `${AddressCities.tableName}.country_id`
        }
      }
    };
  }
}

module.exports = AddressCountries;