const { apiJsonResultWrapper } = require('../helpers');

module.exports = ({ Router, orchestrator }) => {
  const router = Router();

  router.get('/', async (req, res) => {
    return apiJsonResultWrapper(res, async () => {
      return await orchestrator.execute('addresses', 'findAll');
    });
  });

  return router;
};
