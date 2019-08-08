module.exports = (successOrFail, payload) => {
  if (successOrFail === 'success') {
    return {
      success: true,
      errors: [],
      payload: payload
    };
  }

  if (successOrFail === 'fail') {
    if (typeof payload === 'string') {
      payload = [payload];
    }

    return {
      success: false,
      errors: errors,
      payload: null
    };
  }

  throw new Error(`Invalid parameter for ResultWrapper -> ${successOrFail}!`);
}