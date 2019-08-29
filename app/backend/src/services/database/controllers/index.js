const addresses = require('./addresses');
const entities = require('./entities');
const users = require('./users');

module.exports = {
  ...addresses,
  ...entities,
  ...users
};