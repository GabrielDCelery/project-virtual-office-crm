const { apiJsonResultWrapper } = require('../helpers');

module.exports = ({ Router, middlewares, orchestrator }) => {
  const router = Router();

  router.post(
    '/create',
    middlewares.get('multer').createSync('single', 'file'),
    async (req, res) => {
      return apiJsonResultWrapper(res, async () => {
        const { body, file } = req;

        return await orchestrator.execute('mails', 'create', {
          ...body,
          file
        });
      });
    }
  );

  return router;
};
