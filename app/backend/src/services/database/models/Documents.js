const { Model } = require('objection');

class Documents extends Model {
  static get tableName() {
    return 'documents';
  }

  static get TYPES() {
    return {
      DEED_OF_ASSOCIATION: 'deed Of association',
      IDENTITY_CARD: 'identity card',
      MAIL: 'mail',
      SPECIMEN_SIGNATURE: 'specimen signature'
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
          type: 'string',
          enum: [
            Documents.TYPES.DEED_OF_ASSOCIATION,
            Documents.TYPES.IDENTITY_CARD,
            Documents.TYPES.MAIL,
            Documents.TYPES.SPECIMEN_SIGNATURE
          ]
        }
      }
    };
  }

  static get relationMappings() {
    const Mails = require('./Mails');

    return {
      mails: {
        relation: Model.HasManyRelation,
        modelClass: Mails,
        join: {
          from: `${Documents.tableName}.id`,
          to: `${Mails.tableName}.document_id`
        }
      }
    };
  }
}

module.exports = Documents;
