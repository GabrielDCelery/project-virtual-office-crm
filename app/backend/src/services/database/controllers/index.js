const addresses = require('./addresses');
const documents = require('./documents');
const entities = require('./entities');
const mails = require('./mails');
const users = require('./users');

module.exports = {
  ...addresses,
  ...documents,
  ...entities,
  ...mails,
  ...users
};
