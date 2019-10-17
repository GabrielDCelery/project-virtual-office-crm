const { executeService } = globalRequire('services');
const { apiJsonResultWrapper } = require('../helpers');

module.exports = ({ Router, orchestrator }) => {
  const router = Router();

  router.post('/login', async (req, res) => {
    const loginResult = await orchestrator.execute('users', 'login', req.body);

    if (!loginResult.success) {
      return res.json(loginResult);
    }

    res.cookie('PVOCRM_SESSION_ID', loginResult.payload, {
      httpOnly: true,
      secure: true
    });

    return res.json({
      success: true,
      errors: [],
      payload: null
    });
  });

  router.post('/register', async (req, res) => {
    return apiJsonResultWrapper(res, async () => {
      return await executeService('Users', 'register', {
        data: req.body,
        config: {}
      });
    });
  });

  router.post('/authenticate', async (req, res) => {
    return apiJsonResultWrapper(res, async () => {
      return await executeService('Users', 'authenticate', {
        data: req.body,
        config: {}
      });
    });
  });

  return router;
};
