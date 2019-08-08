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
    const AddressLocations = require('./AddressLocations');

    return {
      cities: {
        relation: Model.HasManyRelation,
        modelClass: AddressLocations,
        join: {
          from: `${AddressCountries.tableName}.id`,
          to: `${AddressLocations.tableName}.country_id`
        }
      }
    };
  }
}

module.exports = AddressCountries;