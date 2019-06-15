const {
    Users,
    AddressCountries,
    AddressCities,
    AddressLocations,
    Addresses,
    MailSenders,
    MailSenderNames
} = require('../../models');

exports.up = async knex => {
    await knex.schema.createTable(Users.tableName, table => {
        table.increments('id').primary();
        table.string('email');
        table.string('password');
        table.integer('status').defaultTo(Users.STATUSES.INACTIVE);
        table.unique(['email']);
        table.timestamps();
    });

    await knex.schema.createTable(AddressCountries.tableName, table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('short_name').notNullable();
        table.unique(['name', 'short_name']);
    });

    await knex.schema.createTable(AddressCities.tableName, table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('country_id').references('id').inTable(AddressCountries.tableName).notNullable();
        table.unique(['name', 'country_id']);
    });

    await knex.schema.createTable(AddressLocations.tableName, table => {
        table.increments('id').primary();
        table.string('postcode').notNullable();
        table.integer('city_id').references('id').inTable(AddressCities.tableName).notNullable();
        table.unique(['postcode', 'city_id']);
    });

    await knex.schema.createTable(Addresses.tableName, table => {
        table.increments('id').primary();
        table.integer('location_id').references('id').inTable(AddressLocations.tableName);
        table.string('address_line_1');
        table.string('address_line_2');
        table.timestamps();
    });

    await knex.schema.createTable(MailSenderNames.tableName, table => {
        table.increments('id').primary();
        table.string('name');
        table.unique(['name']);
    });

    await knex.schema.createTable(MailSenders.tableName, table => {
        table.increments('id').primary();
        table.integer('address_id').references('id').inTable(Addresses.tableName);
        table.integer('name_id').references('id').inTable(MailSenderNames.tableName);
        table.unique(['address_id', 'name_id']);
    });
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists(Users.tableName);
    await knex.schema.dropTableIfExists(MailSenders.tableName);
    await knex.schema.dropTableIfExists(MailSenderNames.tableName);
    await knex.schema.dropTableIfExists(Addresses.tableName);
    await knex.schema.dropTableIfExists(AddressLocations.tableName);
    await knex.schema.dropTableIfExists(AddressCities.tableName);
    await knex.schema.dropTableIfExists(AddressCountries.tableName);
};