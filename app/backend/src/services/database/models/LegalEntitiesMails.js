const { Model } = require('objection');

class LegalEntitiesMails extends Model {
  static get tableName() {
    return 'legal_entities_mails';
  }
}

module.exports = LegalEntitiesMails;
