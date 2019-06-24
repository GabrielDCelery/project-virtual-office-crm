'use strict';

const models = require('../../models');
const { TYPEDI_NAMESPACE_DB } = globalRequire('constants');

class AddressCountries {
  constructor(container) {
    this.dbResultWrapper = container.get(`${TYPEDI_NAMESPACE_DB}.ResultWrapper`);
    this.getById = this.getById.bind(this);
  }

  async getById({ id }, { transaction }) {
    const country = await models.AddressCountries
      .query(transaction)
      .findById(id);

    return this.dbResultWrapper.return('success')(country);
  }
}

module.exports = AddressCountries;