const { Model } = require('objection');

class LegalEntitiesMails extends Model {
  static get tableName() {
    return 'legal_entities_mails';
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
        sender_id: {
          type: 'integer'
        },
        subject_id: {
          type: 'integer'
        },
        document_id: {
          type: 'integer'
        }
      }
    };
  }

  static get relationMappings() {
    const Documents = require('./Documents');
    const LegalEntities = require('./LegalEntities');
    const LegalEntitiesMailsAuditTrails = require('./LegalEntitiesMailsAuditTrails');
    const MailSenders = require('./MailSenders');
    const MailSubjects = require('./MailSubjects');

    return {
      legal_entity: {
        relation: Model.BelongsToOneRelation,
        modelClass: LegalEntities,
        join: {
          from: `${LegalEntitiesMails.tableName}.legal_entity_id`,
          to: `${LegalEntities.tableName}.id`
        }
      },
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: MailSenders,
        join: {
          from: `${LegalEntitiesMails.tableName}.sender_id`,
          to: `${MailSenders.tableName}.id`
        }
      },
      subject: {
        relation: Model.BelongsToOneRelation,
        modelClass: MailSubjects,
        join: {
          from: `${LegalEntitiesMails.tableName}.subject_id`,
          to: `${MailSubjects.tableName}.id`
        }
      },
      document: {
        relation: Model.BelongsToOneRelation,
        modelClass: Documents,
        join: {
          from: `${LegalEntitiesMails.tableName}.document_id`,
          to: `${Documents.tableName}.id`
        }
      },
      audit_trails: {
        relation: Model.HasManyRelation,
        modelClass: LegalEntitiesMailsAuditTrails,
        join: {
          from: `${LegalEntitiesMails.tableName}.id`,
          to: `${LegalEntitiesMailsAuditTrails.tableName}.legal_entities_mail_id`
        }
      }
    };
  }
}

module.exports = LegalEntitiesMails;
