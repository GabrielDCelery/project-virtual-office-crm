const { DB_TABLE_NAME_USERS } = require('../../constants');

exports.up = async knex => {
    await knex.schema.createTable(DB_TABLE_NAME_USERS, table => {
        table.increments('id').primary();
        table.string('email');
        table.string('password');
        table.unique(['email']);
        table.timestamps();
    });
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists(DB_TABLE_NAME_USERS);
};