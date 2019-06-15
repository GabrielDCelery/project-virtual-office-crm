const {
    Users
} = require('../../models');

exports.up = async knex => {
    await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('email');
        table.string('password');
        table.integer('status').defaultTo(Users.STATUSES.INACTIVE);
        table.unique(['email']);
        table.timestamps();
    });

    await knex.schema.createTable('address_countries', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('short_name').notNullable();
        table.unique(['name', 'short_name']);
    });

    await knex.schema.createTable('address_cities', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('country_id').references('id').inTable('address_countries').notNullable();
        table.unique(['name', 'country_id']);
    });

    await knex.schema.createTable('address_locations', table => {
        table.increments('id').primary();
        table.string('postcode').notNullable();
        table.integer('city_id').references('id').inTable('address_cities').notNullable();
        table.unique(['postcode', 'city_id']);
    });

    await knex.schema.createTable('addresses', table => {
        table.increments('id').primary();
        table.integer('location_id').references('id').inTable('address_locations');
        table.string('address_line_1');
        table.string('address_line_2');
        table.timestamps();
    });

    await knex.schema.createTable('mail_sender_names', table => {
        table.increments('id').primary();
        table.string('name');
        table.unique(['name']);
    });

    await knex.schema.createTable('mail_senders', table => {
        table.increments('id').primary();
        table.integer('address_id').references('id').inTable('addresses');
        table.integer('name_id').references('id').inTable('mail_sender_names');
        table.unique(['address_id', 'name_id']);
    });
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('mail_senders');
    await knex.schema.dropTableIfExists('mail_sender_names');
    await knex.schema.dropTableIfExists('addresses');
    await knex.schema.dropTableIfExists('address_locations');
    await knex.schema.dropTableIfExists('address_cities');
    await knex.schema.dropTableIfExists('address_countries');
};