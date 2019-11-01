module.exports = ({ services }) => {
  return async () => {
    const dbResults = await services
      .get('database')
      .execute(
        'mailsPendingActions',
        'findAllPendingCopyFromTemporaryToCloudActions'
      );

    console.log(dbResults.payload);

    return {
      bRunAgain: false
    };
  };
};
