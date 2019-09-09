const { Model } = require('objection');

class Phones extends Model {
  static get tableName() {
    return 'phones';
  }

  static get STATUSES() {
    return {
      ACTIVE: 'active',
      INACTIVE: 'inactive'
    };
  }

  static get TYPES() {
    return {
      MOBILE: 'mobile',
      HOME: 'home'
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
        number: {
          type: 'string'
        },
        status: {
          type: 'string',
          enum: [Phones.STATUSES.ACTIVE, Phones.STATUSES.INACTIVE]
        },
        type: {
          type: 'string',
          enum: [Phones.TYPES.MOBILE, Phones.TYPES.HOME]
        },
        country_id: {
          type: 'integer'
        }
      }
    };
  }

  static get relationMappings() {
    const Countries = require('./Countries');
    const LegalEntities = require('./LegalEntities');

    return {
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: Countries,
        join: {
          from: `${Phones.tableName}.country_id`,
          to: `${Countries.tableName}.id`
        }
      },
      legal_entities: {
        relation: Model.ManyToManyRelation,
        modelClass: LegalEntities,
        join: {
          from: `${Phones.tableName}.id`,
          through: {
            from: `${LegalEntities.tableName}_${Phones.tableName}.phone_id`,
            to: `${LegalEntities.tableName}_${Phones.tableName}.legal_entity_id`
          },
          to: `${LegalEntities.tableName}.id`
        }
      }
    };
  }
}

module.exports = Phones;