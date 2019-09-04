const { Model } = require('objection');

class Emails extends Model {
  static get tableName() {
    return 'emails';
  }

  static get STATUSES() {
    return {
      ACTIVE: 'active',
      INACTIVE: 'inactive'
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
        address: {
          type: 'string'
        },
        status: {
          type: 'string',
          enum: [Emails.STATUSES.ACTIVE, Emails.STATUSES.INACTIVE]
        }
      }
    };
  }

  static get relationMappings() {
    const LegalEntities = require('./LegalEntities');

    return {
      legal_entities: {
        relation: Model.ManyToManyRelation,
        modelClass: LegalEntities,
        join: {
          from: `${Emails.tableName}.id`,
          through: {
            from: `${LegalEntities.tableName}_${Emails.tableName}.email_id`,
            to: `${LegalEntities.tableName}_${Emails.tableName}.legal_entity_id`
          },
          to: `${LegalEntities.tableName}.id`
        }
      }
    };
  }
}

module.exports = Emails;
