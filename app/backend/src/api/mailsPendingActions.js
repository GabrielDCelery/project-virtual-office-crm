module.exports = ({ Router, helpers, orchestrator }) => {
  const { ApiResultWrapper } = helpers;
  const router = Router();
  const apiResultWrapper = new ApiResultWrapper();

  router.get('/findAllPendingEmailNotifications', async (req, res) => {
    return apiResultWrapper.returnJSON({
      res,
      toReturn: await orchestrator.execute(
        'mailsPendingActions',
        'findAllPendingEmailNotifications'
      )
    });
  });

  router.post('/sendEmailNotifications', async (req, res) => {
    return apiResultWrapper.returnJSON({
      res,
      toReturn: await orchestrator.execute(
        'mailsPendingActions',
        'sendEmailNotifications',
        req.body
      )
    });
  });

  return router;
};
