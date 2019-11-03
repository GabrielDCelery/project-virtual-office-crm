const { Model } = require('objection');

class NaturalPeopleVersion extends Model {
  static get tableName() {
    return 'natural_people_versions';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: {
          type: 'integer'
        },
        natural_person_id: {
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
        },
        version_end_at: {
          type: 'date'
        }
      }
    };
  }

  static get relationMappings() {
    const NaturalPeople = require('./NaturalPeople');

    return {
      natural_person: {
        relation: Model.BelongsToOneRelation,
        modelClass: NaturalPeople,
        join: {
          from: `${NaturalPeopleVersion.tableName}.natural_person_id`,
          to: `${NaturalPeople.tableName}.id`
        }
      }
    };
  }
}

module.exports = NaturalPeopleVersion;
