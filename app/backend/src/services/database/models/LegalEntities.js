const { Model } = require('objection');

class LegalEntities extends Model {
  static get tableName() {
    return 'legal_entities';
  }

  static get TYPES() {
    return {
      LIMITED_LIABILITY_COMPANY: 'Limited Liability Company',
      UNLIMITED_PARTNERSHIP: 'Unlimited Partnership',
      SOLE_PROPRIETORSHIPS: 'Sole proprietorships'
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
        short_name: {
          type: 'string'
        },
        long_name: {
          type: 'string'
        },
        type: {
          type: 'string',
          enum: [
            LegalEntities.TYPES.LIMITED_LIABILITY_COMPANY,
            LegalEntities.TYPES.UNLIMITED_PARTNERSHIP,
            LegalEntities.TYPES.SOLE_PROPRIETORSHIPS
          ]
        },
        registration_id: {
          type: 'string'
        },
        tax_id: {
          type: 'string'
        },
        permanent_address_id: {
          type: 'id'
        },
        version: {
          type: 'integer'
        },
        version_start_at: {
          type: 'date'
        }
      }
    };
  }

  static get relationMappings() {
    const Addresses = require('./Addresses');
    const Emails = require('./Emails');
    const Mails = require('./Mails');
    const LegalEntitiesVersion = require('./LegalEntitiesVersion');
    const Phones = require('./Phones');

    return {
      legal_entities_versions: {
        relation: Model.HasManyRelation,
        modelClass: LegalEntitiesVersion,
        join: {
          from: `${LegalEntities.tableName}.id`,
          to: `${LegalEntitiesVersion.tableName}.legal_entity_id`
        }
      },
      mails: {
        relation: Model.HasManyRelation,
        modelClass: Mails,
        join: {
          from: `${LegalEntities.tableName}.id`,
          to: `${Mails.tableName}.legal_entity_id`
        }
      },
      emails: {
        relation: Model.ManyToManyRelation,
        modelClass: Emails,
        join: {
          from: `${LegalEntities.tableName}.id`,
          through: {
            from: `${LegalEntities.tableName}_${Emails.tableName}.legal_entity_id`,
            to: `${LegalEntities.tableName}_${Emails.tableName}.email_id`
          },
          to: `${Emails.tableName}.id`
        }
      },
      phones: {
        relation: Model.ManyToManyRelation,
        modelClass: Phones,
        join: {
          from: `${LegalEntities.tableName}.id`,
          through: {
            from: `${LegalEntities.tableName}_${Phones.tableName}.legal_entity_id`,
            to: `${LegalEntities.tableName}_${Phones.tableName}.phone_id`
          },
          to: `${Phones.tableName}.id`
        }
      },
      permanent_address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Addresses,
        join: {
          from: `${LegalEntities.tableName}.permanent_address_id`,
          to: `${Addresses.tableName}.id`
        }
      }
    };
  }
}

module.exports = LegalEntities;
