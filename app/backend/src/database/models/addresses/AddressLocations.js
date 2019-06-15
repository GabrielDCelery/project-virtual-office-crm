const { Model } = require('objection');

class AddressLocations extends Model {
  static get tableName() {
    return 'address_locations';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        postcode: { type: 'string' },
        city_id: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    const AddressCities = require('./AddressCities');

    return {
      city: {
        relation: Model.BelongsToOneRelation,
        modelClass: AddressCities,
        join: {
          from: `${AddressLocations.tableName}.city_id`,
          to: `${AddressCities.tableName}.id`
        }
      }
    };
  }
}

module.exports = AddressLocations;