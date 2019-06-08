const models = require('./models');
const controllers = require('./controllers');
const errors = require('./errors');

module.exports = {
  ...models,
  ...controllers,
  ...errors
};