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
}

module.exports = Emails;
