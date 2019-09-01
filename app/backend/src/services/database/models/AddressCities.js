const { Model } = require('objection');

class AddressCities extends Model {
  static get tableName() {
    return 'address_cities';
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
        county_id: {
          type: 'integer'
        }
      }
    };
  }

  static get relationMappings() {
    const Addresses = require('./Addresses');
    const AddressCountries = require('./AddressCountries');

    return {
      addresses: {
        relation: Model.HasManyRelation,
        modelClass: Addresses,
        join: {
          from: `${AddressCities.tableName}.id`,
          to: `${Addresses.tableName}.city_id`
        }
      },
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: AddressCountries,
        join: {
          from: `${AddressCities.tableName}.country_id`,
          to: `${AddressCountries.tableName}.id`
        }
      }
    };
  }
}

module.exports = AddressCities;
