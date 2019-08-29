const {
  Model
} = require('objection');

class LegalEntities extends Model {
  static get tableName() {
    return 'legal_entities';
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
        version: {
          type: 'integer'
        },
        version_start_at: {
          type: 'date'
        }
      }
    };
  }

  static get relationMappings() {
    const LegalEntitiesVersion = require('./LegalEntitiesVersion');

    return {
      mail_senders: {
        relation: Model.HasManyRelation,
        modelClass: LegalEntitiesVersion,
        join: {
          from: `${LegalEntities.tableName}.id`,
          to: `${LegalEntitiesVersion.tableName}.legal_entity_id`
        }
      }
    };
  }
}

module.exports = LegalEntities;