const addresses = require('./addresses');
const entities = require('./entities');
const mails = require('./mails');
const users = require('./users');

module.exports = {
  ...addresses,
  ...entities,
  ...mails,
  ...users
};