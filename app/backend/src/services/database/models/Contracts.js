const { Model } = require('objection');

class Contracts extends Model {
  static get tableName() {
    return 'contracts';
  }

  static get SIGNATORY_TYPES() {
    return {
      MANAGER: 'manager'
    };
  }

  static get STATUSES() {
    return {
      ACTIVE: 'active'
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
        client_id: {
          type: 'integer'
        },
        client_signatory_id: {
          type: 'integer'
        },
        client_signatory_type: {
          type: 'string',
          enum: [Contracts.TYPES.MANAGER]
        },
        service_provider_id: {
          type: 'integer'
        },
        service_provider_signatory_id: {
          type: 'integer'
        },
        service_provider_signatory_type: {
          type: 'string',
          enum: [Contracts.TYPES.MANAGER]
        },
        start_at: {
          type: 'date'
        },
        end_at: {
          type: 'date'
        },
        status: {
          type: 'string',
          enum: [Contracts.STATUSES.ACTIVE]
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
    return {};
  }
}

module.exports = Contracts;
