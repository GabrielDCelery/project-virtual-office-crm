const { Model } = require('objection');

class Invoices extends Model {
  static get tableName() {
    return 'invoices';
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
        payment_amount: {
          type: integer
        },
        payment_method: {
          type: 'string'
        },
        invoice_creation_date: {
          type: 'date'
        },
        transfer_date: {
          type: 'date'
        }
      }
    };
  }

  static get relationMappings() {}
}

module.exports = Invoices;
