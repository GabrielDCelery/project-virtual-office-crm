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
        }
      }
    };
  }

  static get relationMappings() {
    const Emails = require('./Emails');
    const Phones = require('./Phones');

    return {
      emails: {
        relation: Model.ManyToManyRelation,
        modelClass: Emails,
        join: {
          from: `${Contracts.tableName}.id`,
          through: {
            from: `${Contracts.tableName}_${Emails.tableName}.contract_id`,
            to: `${Contracts.tableName}_${Emails.tableName}.email_id`
          },
          to: `${Emails.tableName}.id`
        }
      },
      phones: {
        relation: Model.ManyToManyRelation,
        modelClass: Phones,
        join: {
          from: `${Contracts.tableName}.id`,
          through: {
            from: `${Contracts.tableName}_${Phones.tableName}.contract_id`,
            to: `${Contracts.tableName}_${Phones.tableName}.phone_id`
          },
          to: `${Phones.tableName}.id`
        }
      }
    };
  }

  $beforeInsert() {
    const date = new Date().toISOString();

    this.created_at = date;
    this.updated_at = date;
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Contracts;
