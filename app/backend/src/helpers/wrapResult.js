module.exports = ({
  type,
  service,
  payload,
  errors
}) => {
  if (type === 'success') {
    return {
      success: true,
      service,
      errors: [],
      payload: payload
    };
  }

  if (type === 'fail') {
    return {
      success: false,
      service,
      errors: typeof errors === 'string' ? [errors] : errors,
      payload: null
    };
  }

  throw new Error(`Invalid parameter for ResultWrapper -> ${successOrFail}!`);
}