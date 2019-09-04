const { Model } = require('objection');

class MailSubjects extends Model {
  static get tableName() {
    return 'mail_subjects';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: {
          type: 'integer'
        },
        long_subject: {
          type: 'string'
        }
      }
    };
  }

  static get relationMappings() {
    const LegalEntitiesMails = require('./LegalEntitiesMails');

    return {
      legal_entities_mails: {
        relation: Model.HasManyRelation,
        modelClass: LegalEntitiesMails,
        join: {
          from: `${MailSubjects.tableName}.id`,
          to: `${LegalEntitiesMails.tableName}.subject_id`
        }
      }
    };
  }
}

module.exports = MailSubjects;
