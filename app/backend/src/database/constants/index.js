const models = require('./models');
const errors = require('./errors');

module.exports = {
  ...models,
  ...errors
};