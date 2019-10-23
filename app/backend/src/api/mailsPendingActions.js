module.exports = ({ Router, helpers, orchestrator }) => {
  const { ApiResultWrapper } = helpers;
  const router = Router();
  const apiResultWrapper = new ApiResultWrapper();

  router.post('/findAllPendingEmailNotifications', async (req, res) => {
    return apiResultWrapper.returnJSON({
      res,
      toReturn: await orchestrator.execute(
        'mailsPendingActions',
        'findAllPendingEmailNotifications'
      )
    });
  });

  return router;
};
