const {
  Model
} = require('objection');

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
}

module.exports = MailSubjects;