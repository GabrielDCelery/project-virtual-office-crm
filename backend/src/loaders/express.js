const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = {
  start: async app => {
    app.use(bodyParser.json());
    app.use(cors());

    // Path for performing health check on the service
    app.get('/health', (req, res) => {
      res.status(200);
      res.send('OK');
    });
  },
  stop: async () => { }
};
