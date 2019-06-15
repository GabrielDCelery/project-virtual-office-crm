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
              id: { type: 'integer' },
              name: { type: 'string' },
              county_id: { type: 'integer' }
          }
      };
  }

  static get relationMappings() {
      const AddressLocations = require('./AddressLocations');
      const AddressCountries = require('./AddressCountries');

      return {
          locations: {
              relation: CustomModel.HasManyRelation,
              modelClass: AddressLocations,
              join: {
                  from: `${AddressCities.tableName}.id`,
                  to: `${AddressLocations.tableName}.city_id`
              }
          },
          country: {
              relation: CustomModel.BelongsToOneRelation,
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