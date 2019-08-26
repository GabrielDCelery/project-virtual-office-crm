module.exports = services => {
  return async ({
    bFlatten
  }) => {
    return await services.get("database").execute("addresses", "findAll", {
      bFlatten
    });
  }
};