class ServiceResultWrapper {
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
    if (type === ServiceResultWrapper.TYPE.SUCCESS) {
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

    if (type === ServiceResultWrapper.TYPE.FAIL) {
      return {
        success: false,
        service,
        errors: typeof errors === 'string' ? [errors] : errors,
        payload: null
      };
    }

    throw new Error(`Invalid parameter for ServiceResultWrapper -> ${type}!`);
  }
}

module.exports = ServiceResultWrapper;
