const { Model } = require('objection');

class NaturalPeople extends Model {
  static get tableName() {
    return 'natural_people';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: {
          type: 'integer'
        },
        first_name: {
          type: 'string'
        },
        last_name: {
          type: 'string'
        },
        mother_name: {
          type: 'string'
        },
        birth_date: {
          type: 'date'
        },
        identifier_document_id: {
          type: 'integer'
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
    const Addresses = require('./Addresses');
    const Documents = require('./Documents');
    const NaturalPeopleVersion = require('./NaturalPeopleVersion');

    return {
      natural_people_versions: {
        relation: Model.HasManyRelation,
        modelClass: NaturalPeopleVersion,
        join: {
          from: `${NaturalPeople.tableName}.id`,
          to: `${NaturalPeopleVersion.tableName}.natural_person_id`
        }
      },
      identifier_document: {
        relation: Model.BelongsToOneRelation,
        modelClass: Documents,
        join: {
          from: `${NaturalPeople.tableName}.identifier_document_id`,
          to: `${Documents.tableName}.id`
        }
      },
      permanent_address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Addresses,
        join: {
          from: `${NaturalPeople.tableName}.permanent_address_id`,
          to: `${Addresses.tableName}.id`
        }
      }
    };
  }
}

module.exports = NaturalPeople;
