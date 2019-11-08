const { Model } = require('objection');

class Services extends Model {
  static get tableName() {
    return 'services';
  }

  static get NAMES() {
    return {
      SEND_EMAIL_NOTIFICATION: 'send email notification',
      POST_MAILS_MONTHLY: 'post mails monthly'
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
          type: 'string',
          enum: [
            Services.NAMES.SEND_EMAIL_NOTIFICATION,
            Services.NAMES.POST_MAILS_MONTHLY
          ]
        }
      }
    };
  }

  static get relationMappings() {
    const Contracts = require('./Contracts');

    return {
      contracts: {
        relation: Model.ManyToManyRelation,
        modelClass: Contracts,
        join: {
          from: `${Services.tableName}.id`,
          through: {
            from: `${Contracts.tableName}_${Services.tableName}.service_id`,
            to: `${Contracts.tableName}_${Services.tableName}.contract_id`
          },
          to: `${Contracts.tableName}.id`
        }
      }
    };
  }
}

module.exports = Services;
