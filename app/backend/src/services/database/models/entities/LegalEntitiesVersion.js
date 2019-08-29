const {
  Model
} = require('objection');

class LegalEntitiesVersion extends Model {
  static get tableName() {
    return 'legal_entities_version';
  }

  static get TYPES() {
    return {
      KFT: 0,
      BT: 1
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: {
          type: 'integer'
        },
        legal_entity_id: {
          type: 'integer'
        },
        short_name: {
          type: 'string'
        },
        long_name: {
          type: 'string'
        },
        type: {
          type: 'integer'
        },
        registration_id: {
          type: 'string'
        },
        tax_id: {
          type: 'string'
        },
        permanent_address_id: {
          type: 'id'
        },
        version_start_at: {
          type: 'date'
        },
        version_end_at: {
          type: 'date'
        }
      }
    };
  }
}

module.exports = LegalEntitiesVersion;