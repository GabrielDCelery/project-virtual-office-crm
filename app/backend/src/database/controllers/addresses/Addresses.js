const models = require('../../models');
const { TYPEDI_NAMESPACE_DB } = globalRequire('constants');

class Addresses {
  constructor(container) {
    this.dbResultWrapper = container.get(`${TYPEDI_NAMESPACE_DB}.ResultWrapper`);
    this.findAll = this.findAll.bind(this);
  }

  async findAll({ }, { bFlatten, transaction }) {
    let addresses = await models.Addresses
      .query(transaction)
      .eager('location.city.country');

    if (bFlatten) {
      addresses = addresses.map(Addresses.flattenRecord);
    }

    return this.dbResultWrapper.return('success')(addresses);
  }

  static flattenRecord(record) {
    return {
      id: record.id,
      location_id: record.location.id,
      postcode: record.location.postcode,
      city_id: record.location.city.id,
      city_name: record.location.city.name,
      country_id: record.location.city.country.id,
      country_name: record.location.city.country.name,
      country_short_name: record.location.city.country.short_name,
      address_line_1: record.address_line_1,
      address_line_2: record.address_line_2,
      created_at: record.created_at,
      updated_at: record.updated_at
    };
  }
}

module.exports = Addresses;