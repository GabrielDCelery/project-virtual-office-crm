const {
  Model
} = require('objection');

class LegalEntitiesMailsEvents extends Model {
  static get tableName() {
    return 'legal_entities_mails_events';
  }
}

module.exports = LegalEntitiesMailsEvents;