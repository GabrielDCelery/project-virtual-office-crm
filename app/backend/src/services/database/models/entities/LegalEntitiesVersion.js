const {
  Model
} = require('objection');

class LegalEntitiesVersion extends Model {
  static get tableName() {
    return 'legal_entities_version';
  }

  static get TYPES() {
    return {
      LIMITED_LIABILITY_COMPANY: 'Limited Liability Company',
      UNLIMITED_PARTNERSHIP: 'Unlimited Partnership',
      SOLE_PROPRIETORSHIPS: 'Sole proprietorships'
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
          type: 'string',
          enum: [
            LegalEntitiesVersion.TYPES.LIMITED_LIABILITY_COMPANY,
            LegalEntitiesVersion.TYPES.UNLIMITED_PARTNERSHIP,
            LegalEntitiesVersion.TYPES.SOLE_PROPRIETORSHIPS
          ]
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