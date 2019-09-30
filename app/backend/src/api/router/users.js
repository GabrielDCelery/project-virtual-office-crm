const { executeService } = globalRequire('services');
const { apiJsonResultWrapper } = require('../helpers');
const { Router } = require('express');
const router = Router();
const orchestrator = globalRequire('orchestrator');

router.post('/login', async (req, res) => {
  const loginResult = await orchestrator.execute('users', 'login', req.body);

  if (!loginResult.success) {
    return res.json(loginResult);
  }

  res.cookie('PVOCRM_SESSION_ID', loginResult.payload, {
    httpOnly: true,
    secure: true
  });

  return res.json(loginResult);
});

router.post('/register', async (req, res) => {
  return apiJsonResultWrapper(res, () =>
    executeService('Users', 'register', {
      data: req.body,
      config: {}
    })
  );
});

router.post('/authenticate', async (req, res) => {
  return apiJsonResultWrapper(res, () =>
    executeService('Users', 'authenticate', {
      data: req.body,
      config: {}
    })
  );
});

module.exports = router;
