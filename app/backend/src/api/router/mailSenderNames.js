const { apiJsonResultWrapper } = require('../helpers');

module.exports = ({ Router, orchestrator }) => {
  const router = Router();

  router.get('/findAll', async (req, res) => {
    return apiJsonResultWrapper(res, async () => {
      return await orchestrator.execute('mailSenderNames', 'findAll');
    });
  });

  router.post('/create', async (req, res) => {
    return apiJsonResultWrapper(res, async () => {
      return await orchestrator.execute('mailSenderNames', 'create', req.body);
    });
  });

  return router;
};
