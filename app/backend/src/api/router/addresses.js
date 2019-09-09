const { Router } = require('express');
const { apiJsonResultWrapper } = require('../helpers');
const orchestrator = globalRequire('orchestrator');
const router = Router();

router.get('/', async (req, res) => {
  return apiJsonResultWrapper(res, () => {
    return orchestrator.execute('addresses', 'findAll');
  });
});

module.exports = router;
