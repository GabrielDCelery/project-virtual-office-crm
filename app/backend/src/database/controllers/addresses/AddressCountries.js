'use strict';

const models = require('../../models');

class AddressCountries {
  constructor(container) {
    this.dbResultWrapper = container.get('db.ResultWrapper');
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