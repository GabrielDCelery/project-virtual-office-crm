const controllers = require('./controllers');
const errors = require('./errors');

module.exports = {
  ...controllers,
  ...errors
};