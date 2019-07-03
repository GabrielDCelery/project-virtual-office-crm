const models = require('../../models');
const { TYPEDI_NAMESPACE_DB } = globalRequire('constants');

class AddressCities {
  constructor(container) {
    this.dbResultWrapper = container.get(`${TYPEDI_NAMESPACE_DB}.ResultWrapper`);
    this.findAll = this.findAll.bind(this);
  }

  async findAll({ }, { bFlatten, transaction }) {
    let addresses = await models.AddressCities
      .query(transaction)
      .eager('country');

    if (bFlatten) {
      addresses = addresses.map(AddressCities.flattenRecord);
    }

    return this.dbResultWrapper.return('success')(addresses);
  }

  static flattenRecord(record) {
    return {
      id: record.id,
      name: record.name,
      country_id: record.country.id,
      country_name: record.country.name,
      country_short_name: record.country.short_name
    };
  }
}

module.exports = AddressCities;