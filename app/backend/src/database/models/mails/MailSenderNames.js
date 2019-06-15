const { Model } = require('objection');

class MailSenderNames extends Model {
    static get tableName() {
        return 'mail_sender_names';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' }
            }
        };
    }

    static get relationMappings() {
        const MailSenders = require('./MailSenders');

        return {
            mail_senders: {
                relation: CustomModel.HasManyRelation,
                modelClass: MailSenders,
                join: {
                    from: `${MailSenderNames.tableName}.id`,
                    to: `${MailSenders.tableName}.name_id`
                }
            }
        };
    }
}

module.exports = MailSenderNames;