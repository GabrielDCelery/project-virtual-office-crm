const {
  Model
} = require('objection');

class DocumentsDetails extends Model {
  static get tableName() {
    return 'documents_details';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: {
          type: 'integer'
        },
        aws_storage_details: {
          type: 'json'
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

  static get relationMappings() {
    const Documents = require('./Documents');

    return {
      document: {
        relation: Model.BelongsToOneRelation,
        modelClass: Documents,
        join: {
          from: `${DocumentsDetails.tableName}.document_id`,
          to: `${Documents.tableName}.id`
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

module.exports = DocumentsDetails;