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
        name: {
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
          type: 'string',
          format: 'date-time'
        },
        version_end_at: {
          type: 'string',
          format: 'date-time'
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
    const LegalEntitiesVersion = require('./LegalEntitiesVersion');

    return {
      mail_senders: {
        relation: CustomModel.HasManyRelation,
        modelClass: LegalEntitiesVersion,
        join: {
          from: `${LegalEntities.tableName}.id`,
          to: `${LegalEntitiesVersion.tableName}.legal_entity_id`
        }
      }
    };
  }

  async $beforeInsert(context) {
    await super.$beforeInsert(context);

    const date = new Date().toISOString();

    this.created_at = date;
    this.updated_at = date;
  }

  async $beforeUpdate(context) {
    await super.$beforeInsert(context);

    this.updated_at = new Date().toISOString();
  }
}

module.exports = LegalEntities;