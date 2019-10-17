module.exports = async (res, methodToExecute = async () => {}) => {
  try {
    return res.json(await methodToExecute());
  } catch (error) {
    return res.json({
      success: false,
      errors: [error.message],
      payload: null
    });
  }
};
