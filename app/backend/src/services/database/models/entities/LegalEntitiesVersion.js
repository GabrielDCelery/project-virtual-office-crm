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

module.exports = LegalEntitiesVersion;