module.exports = ({ Router, helpers, orchestrator }) => {
  const { ApiResultWrapper } = helpers;
  const router = Router();
  const apiResultWrapper = new ApiResultWrapper();

  router.get('/getAllVersionsOfAllEntities', async (req, res) => {
    return apiResultWrapper.returnJSON({
      res,
      toReturn: await orchestrator.execute(
        'legalEntities',
        'getAllVersionsOfAllEntities'
      )
    });
  });

  router.get('/getAllVersionsOfSingleEntity', async (req, res) => {
    return apiResultWrapper.returnJSON({
      res,
      toReturn: await orchestrator.execute(
        'legalEntities',
        'getAllVersionsOfSingleEntity',
        req.body
      )
    });
  });

  router.post('/update', async (req, res) => {
    return apiResultWrapper.returnJSON({
      res,
      toReturn: await orchestrator.execute('legalEntities', 'update', req.body)
    });
  });

  return router;
};
