class AddressCountries {
  constructor({
    models,
    helpers
  }) {
    this.models = models;
    this.helpers = helpers;
    this.findById = this.findById.bind(this);
  }

  async findById({
    id
  }, {
    transaction
  }) {
    const country = await this.models.AddressCountries
      .query(transaction)
      .findById(id);

    return this.dbResultWrapper.return('success')(country);
  }

  async findAll({ }, {
    transaction
  }) {
    const countries = await this.models.AddressCountries
      .query(transaction)
      .orderBy('id');

    return this.dbResultWrapper.return('success')(countries);
  }
}

module.exports = AddressCountries;