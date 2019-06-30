const models = require('../../models');
const { TYPEDI_NAMESPACE_DB } = globalRequire('constants');

class AddressCountries {
  constructor(container) {
    this.dbResultWrapper = container.get(`${TYPEDI_NAMESPACE_DB}.ResultWrapper`);
    this.findById = this.findById.bind(this);
  }

  async findById({ id }, { transaction }) {
    const country = await models.AddressCountries
      .query(transaction)
      .findById(id);

    return this.dbResultWrapper.return('success')(country);
  }

  async findAll({ }, { transaction }) {
    const countries = await models.AddressCountries
      .query(transaction)
      .orderBy('id');

    return this.dbResultWrapper.return('success')(countries);
  }
}

module.exports = AddressCountries;