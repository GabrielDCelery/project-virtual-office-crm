const users = require('./users');
const addresses = require('./addresses');
const mails = require('./mails');

module.exports = {
  ...users,
  ...addresses,
  ...mails
};