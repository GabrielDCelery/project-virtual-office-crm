const { Router } = require('express');
const { apiJsonResultWrapper } = require('../helpers');
const orchestrator = globalRequire('orchestrator');
const router = Router();

router.get('/getAllVersionsOfAllEntities', async (req, res) => {
  return apiJsonResultWrapper(res, () => {
    return orchestrator.execute('legalEntities', 'getAllVersionsOfAllEntities');
  });
});

router.get('/getAllVersionsOfSingleEntity', async (req, res) => {
  return apiJsonResultWrapper(res, () => {
    return orchestrator.execute(
      'legalEntities',
      'getAllVersionsOfSingleEntity',
      { id: 2 }
    );
  });
});

router.post('/update', async (req, res) => {
  return apiJsonResultWrapper(res, () =>
    orchestrator.execute('legalEntities', 'update', req.body)
  );
});

module.exports = router;
