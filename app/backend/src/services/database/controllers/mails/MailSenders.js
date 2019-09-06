class MailSenders {
  constructor({ models, nodeModules }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.findAll = this.findAll.bind(this);
  }

  static flattenRecord(record) {
    return {
      id: record.id,
      postcode: record.address.postcode,
      city_id: record.address.city.id,
      city_name: record.address.city.name,
      country_id: record.address.city.country.id,
      country_name: record.address.city.country.name,
      country_short_name: record.address.city.country.short_name,
      long_street: record.address.long_street,
      name_id: record.name.id,
      name_name: record.name.name
    };
  }

  async findAll({ bFlatten, transaction }) {
    const mailSenders = await this.models.MailSenders.query(transaction).eager(
      '[address.city.country, name]'
    );

    return bFlatten === true
      ? mailSenders.map(MailSenders.flattenRecord)
      : mailSenders;
  }
}

module.exports = MailSenders;
