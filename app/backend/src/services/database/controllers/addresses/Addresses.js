class Addresses {
  constructor({ models, nodeModules }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.findAll = this.findAll.bind(this);
  }

  async findAll({ bFlatten, transaction }) {
    let addresses = await this.models.Addresses.query(transaction).eager(
      'city.country'
    );

    return bFlatten === true
      ? addresses.map(Addresses.flattenRecord)
      : addresses;
  }

  static flattenRecord(record) {
    return {
      id: record.id,
      postcode: record.postcode,
      city_id: record.city.id,
      city_name: record.city.name,
      country_id: record.city.country.id,
      country_name: record.city.country.name,
      country_short_name: record.city.country.short_name,
      long_street: record.long_street,
      created_at: record.created_at,
      updated_at: record.updated_at
    };
  }
}

module.exports = Addresses;
