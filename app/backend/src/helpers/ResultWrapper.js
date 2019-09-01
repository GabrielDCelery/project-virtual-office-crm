class ResultWrapper {
  constructor() {
    this.wrap = this.wrap.bind(this);
  }

  static get TYPE() {
    return {
      SUCCESS: 'SUCCESS',
      FAIL: 'FAIL'
    };
  }

  wrap({ type, service, payload, errors, extra }) {
    if (type === ResultWrapper.TYPE.SUCCESS) {
      const returnObject = {
        success: true,
        service,
        errors: [],
        payload: payload
      };

      if (extra) {
        returnObject[extra];
      }

      return returnObject;
    }

    if (type === ResultWrapper.TYPE.FAIL) {
      return {
        success: false,
        service,
        errors: typeof errors === 'string' ? [errors] : errors,
        payload: null
      };
    }

    throw new Error(`Invalid parameter for ResultWrapper -> ${type}!`);
  }
}

module.exports = ResultWrapper;
