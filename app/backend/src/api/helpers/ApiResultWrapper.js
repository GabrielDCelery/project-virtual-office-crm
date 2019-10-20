const _ = require('lodash');

class ApiResultWrapper {
  constructor() {
    this.returnJSON = this.returnJSON.bind(this);
  }

  returnJSON({ res, toReturn, omit }) {
    const { success, errors, payload } = toReturn;

    return res.json({
      success,
      errors: errors.map(error => error.message),
      payload: _.omit(payload, omit || [])
    });
  }
}

module.exports = ApiResultWrapper;
