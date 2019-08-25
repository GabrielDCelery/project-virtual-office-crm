class AddressCities {
  constructor({ models, helpers }) {
    this.models = models;
    this.helpers = helpers;
    this.findAll = this.findAll.bind(this);
  }

  async findAll({ }, {
    bFlatten,
    transaction
  }) {
    let addresses = await this.models.AddressCities
      .query(transaction)
      .eager('country');

    if (bFlatten) {
      addresses = addresses.map(AddressCities.flattenRecord);
    }

    return this.helpers.wrapResult('success', addresses);
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