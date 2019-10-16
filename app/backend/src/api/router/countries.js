const { apiJsonResultWrapper } = require('../helpers');

module.exports = ({ Router, orchestrator }) => {
  const router = Router();

  router.get('/findAll', async (req, res) => {
    return apiJsonResultWrapper(res, async () => {
      return await orchestrator.execute('countries', 'findAll');
    });
  });

  return router;
};
