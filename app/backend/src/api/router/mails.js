const { apiJsonResultWrapper } = require('../helpers');

module.exports = ({ Router, middlewares, orchestrator }) => {
  const router = Router();

  router.post(
    '/addNew',
    middlewares.get('multer').createSync('single', 'document'),
    async (req, res) => {
      return apiJsonResultWrapper(res, () => {
        return orchestrator.execute('mails', 'addNew');
      });
    }
  );

  return router;
};
