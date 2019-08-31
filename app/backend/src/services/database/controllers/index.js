const addresses = require('./addresses');
const documents = require('./documents');
const entities = require('./entities');
const users = require('./users');

module.exports = {
  ...addresses,
  ...documents,
  ...entities,
  ...users
};