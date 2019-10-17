const { apiJsonResultWrapper } = require('../helpers');

module.exports = ({ Router, middlewares, orchestrator }) => {
  const router = Router();

  router.post(
    '/create',
    middlewares.get('multer').createSync('single', 'document'),
    async (req, res) => {
      return apiJsonResultWrapper(res, () => {
        return orchestrator.execute('mails', 'create');
      });
    }
  );

  return router;
};
