class DbResultWrapper {
  return(successOrFail) {
    if (successOrFail === 'success') {
      return payload => {
        return {
          success: true,
          errors: [],
          payload: payload
        };
      };
    }

    if (successOrFail === 'fail') {
      return (errors = []) => {
        if (typeof errors === 'string') {
          errors = [errors];
        }

        return {
          success: false,
          errors: errors,
          payload: null
        };
      };
    }

    throw new Error(
      `Invalid parameter for DbResultWrapper -> ${successOrFail}!`
    );
  }
}

module.exports = DbResultWrapper;
