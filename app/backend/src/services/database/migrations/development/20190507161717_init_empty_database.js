const {
	AddressCities,
	AddressCountries,
	Addresses,
	LegalEntities,
	LegalEntitiesVersion,
	MailSenderNames,
	MailSenders,
	Users
} = require('../../models');

exports.up = async knex => {
	await knex.schema.createTable(Users.tableName, table => {
		table.increments('id').primary();
		table.string('email');
		table.string('password');
		table.integer('status').defaultTo(Users.STATUSES.INACTIVE);
		table.timestamps();
		table.unique(['email']);
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

	await knex.schema.createTable(Addresses.tableName, table => {
		table.increments('id').primary();
		table.string('postcode').notNullable();
		table.integer('city_id').references('id').inTable(AddressCities.tableName).notNullable();
		table.string('long_street');
		table.timestamps();
		table.unique(['postcode', 'city_id', 'long_street']);
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

	await knex.schema.createTable(LegalEntities.tableName, table => {
		table.increments('id').primary();
		table.string('name');
		table.integer('type');
		table.string('registration_id');
		table.string('tax_id');
		table.integer('permanent_address_id');
		table.integer('version');
		table.date('version_start_at');
		table.date('version_end_at');
		table.timestamps();
	});

	await knex.schema.createTable(LegalEntitiesVersion.tableName, table => {
		table.increments('id').primary();
		table.integer('legal_entity_id').references('id').inTable(LegalEntities.tableName).notNullable();
		table.string('name');
		table.integer('type');
		table.string('registration_id');
		table.string('tax_id');
		table.integer('permanent_address_id').references('id').inTable(Addresses.tableName).notNullable();
		table.integer('version');
		table.date('version_start_at');
		table.date('version_end_at');
		table.timestamps();
		table.unique(['legal_entity_id', 'version']);
	});
};

exports.down = async knex => {
	await knex.schema.dropTableIfExists(LegalEntitiesVersion.tableName);
	await knex.schema.dropTableIfExists(LegalEntities.tableName);
	await knex.schema.dropTableIfExists(MailSenders.tableName);
	await knex.schema.dropTableIfExists(MailSenderNames.tableName);
	await knex.schema.dropTableIfExists(Addresses.tableName);
	await knex.schema.dropTableIfExists(AddressCities.tableName);
	await knex.schema.dropTableIfExists(AddressCountries.tableName);
	await knex.schema.dropTableIfExists(Users.tableName);
};