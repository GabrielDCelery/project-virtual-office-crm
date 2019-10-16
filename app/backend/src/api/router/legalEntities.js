const { apiJsonResultWrapper } = require('../helpers');

module.exports = ({ Router, orchestrator }) => {
  const router = Router();

  router.get('/getAllVersionsOfAllEntities', async (req, res) => {
    return apiJsonResultWrapper(res, async () => {
      return await orchestrator.execute(
        'legalEntities',
        'getAllVersionsOfAllEntities'
      );
    });
  });

  router.get('/getAllVersionsOfSingleEntity', async (req, res) => {
    return apiJsonResultWrapper(res, async () => {
      return await orchestrator.execute(
        'legalEntities',
        'getAllVersionsOfSingleEntity',
        req.body
      );
    });
  });

  router.post('/update', async (req, res) => {
    return apiJsonResultWrapper(res, async () => {
      return await orchestrator.execute('legalEntities', 'update', req.body);
    });
  });

  return router;
};
