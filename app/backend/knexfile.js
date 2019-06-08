'use strict';

const { database } = require('./src/config');

module.exports = database['connection'];