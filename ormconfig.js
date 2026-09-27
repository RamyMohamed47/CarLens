const { DataSource } = require('typeorm');
const { getDatabaseOptions } = require('./src/database.config');

module.exports = new DataSource(getDatabaseOptions());
