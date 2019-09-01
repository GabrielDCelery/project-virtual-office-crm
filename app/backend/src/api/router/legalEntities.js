const { Router } = require('express');
const { apiJsonResultWrapper } = require('../helpers');
const orchestrator = globalRequire('orchestrator');
const router = Router();

router.post('/update', async (req, res) => {
  return apiJsonResultWrapper(res, () =>
    orchestrator.execute('legalEntities', 'update', req.body)
  );
});

module.exports = router;
