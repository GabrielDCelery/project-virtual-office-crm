const { Router } = require('express');
const { apiJsonResultWrapper } = require('../helpers');
const orchestrator = globalRequire('orchestrator');
const router = Router();

router.get('/findAll', async (req, res) => {
  return apiJsonResultWrapper(res, () => {
    return orchestrator.execute('mailSenderNames', 'findAll');
  });
});

router.post('/create', async (req, res) => {
  return apiJsonResultWrapper(res, () => {
    return orchestrator.execute('mailSenderNames', 'create', req.body);
  });
});

module.exports = router;
