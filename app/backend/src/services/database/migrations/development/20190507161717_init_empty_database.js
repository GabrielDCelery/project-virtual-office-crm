const {
  Cities,
  Countries,
  Addresses,
  Documents,
  DocumentsDetails,
  Emails,
  LegalEntities,
  LegalEntitiesMails,
  LegalEntitiesMailsAuditTrails,
  LegalEntitiesMailsAuditTrailsDetails,
  LegalEntitiesVersion,
  MailSenderNames,
  MailSenders,
  MailSubjects,
  Phones,
  Users
} = require('../../models');

exports.up = async knex => {
  await knex.schema.createTable(Countries.tableName, table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('short_name').notNullable();
    table.string('phone_code');
  });

  await knex.schema.createTable(Cities.tableName, table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table
      .integer('country_id')
      .references('id')
      .inTable(Countries.tableName)
      .notNullable();
    table.unique(['name', 'country_id']);
  });

  await knex.schema.createTable(Phones.tableName, table => {
    table.increments('id').primary();
    table.string('number').notNullable();
    table
      .integer('country_id')
      .references('id')
      .inTable(Countries.tableName)
      .notNullable();
    table.enum('status', [Phones.STATUSES.ACTIVE, Phones.STATUSES.INACTIVE]);
    table.enum('type', [Phones.TYPES.MOBILE, Phones.TYPES.HOME]);
    table.unique(['country_id', 'number']);
  });

  await knex.schema.createTable(Emails.tableName, table => {
    table.increments('id').primary();
    table.string('address');
    table.enum('status', [Emails.STATUSES.ACTIVE, Emails.STATUSES.INACTIVE]);
  });

  await knex.schema.createTable(Documents.tableName, table => {
    table.increments('id').primary();
    table.string('name');
    table.enum('type', [
      Documents.TYPES.DEED_OF_ASSOCIATION,
      Documents.TYPES.IDENTITY_CARD,
      Documents.TYPES.MAIL,
      Documents.TYPES.SPECIMEN_SIGNATURE
    ]);
  });

  await knex.schema.createTable(DocumentsDetails.tableName, table => {
    table
      .increments('id')
      .references('id')
      .inTable(Documents.tableName)
      .notNullable()
      .primary();
    table.jsonb('aws_storage_details');
    table.timestamps();
  });

  await knex.schema.createTable(Users.tableName, table => {
    table.increments('id').primary();
    table.string('email');
    table.string('password');
    table
      .enum('status', [
        Users.STATUSES.INACTIVE,
        Users.STATUSES.ACTIVE,
        Users.STATUSES.SUSPENDED
      ])
      .defaultTo(Users.STATUSES.INACTIVE);
    table.timestamps();
    table.unique(['email']);
  });

  await knex.schema.createTable(Addresses.tableName, table => {
    table.increments('id').primary();
    table.string('postcode').notNullable();
    table
      .integer('city_id')
      .references('id')
      .inTable(Cities.tableName)
      .notNullable();
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
    table
      .integer('address_id')
      .references('id')
      .inTable(Addresses.tableName);
    table
      .integer('name_id')
      .references('id')
      .inTable(MailSenderNames.tableName);
    table.unique(['address_id', 'name_id']);
  });

  await knex.schema.createTable(MailSubjects.tableName, table => {
    table.increments('id').primary();
    table.string('long_subject');
    table.unique(['long_subject']);
  });

  await knex.schema.createTable(LegalEntities.tableName, table => {
    table.increments('id').primary();
    table.string('short_name');
    table.string('long_name');
    table.enum('type', [
      LegalEntities.TYPES.LIMITED_LIABILITY_COMPANY,
      LegalEntities.TYPES.UNLIMITED_PARTNERSHIP
    ]);
    table.string('registration_id');
    table.string('tax_id');
    table.integer('permanent_address_id');
    table.integer('version');
    table.datetime('version_start_at');
  });

  await knex.schema.createTable(LegalEntitiesVersion.tableName, table => {
    table.increments('id').primary();
    table.string('short_name');
    table.string('long_name');
    table.enum('type', [
      LegalEntitiesVersion.TYPES.LIMITED_LIABILITY_COMPANY,
      LegalEntitiesVersion.TYPES.UNLIMITED_PARTNERSHIP
    ]);
    table.string('registration_id');
    table.string('tax_id');
    table
      .integer('permanent_address_id')
      .references('id')
      .inTable(Addresses.tableName)
      .notNullable();
    table
      .integer('legal_entity_id')
      .references('id')
      .inTable(LegalEntities.tableName)
      .notNullable();
    table.integer('version');
    table.datetime('version_start_at');
    table.datetime('version_end_at');
    table.unique(['legal_entity_id', 'version']);
    table.index(['legal_entity_id'], 'legal_entity_id');
  });

  await knex.schema.createTable(LegalEntitiesMails.tableName, table => {
    table.increments('id').primary();
    table
      .integer('legal_entity_id')
      .references('id')
      .inTable(LegalEntities.tableName)
      .notNullable();
    table
      .integer('sender_id')
      .references('id')
      .inTable(MailSenders.tableName)
      .notNullable();
    table
      .integer('subject_id')
      .references('id')
      .inTable(MailSubjects.tableName)
      .notNullable();
    table
      .integer('document_id')
      .references('id')
      .inTable(Documents.tableName)
      .notNullable();
  });

  await knex.schema.createTable(
    LegalEntitiesMailsAuditTrails.tableName,
    table => {
      table.increments('id').primary();
      table
        .integer('legal_entities_mail_id')
        .references('id')
        .inTable(LegalEntitiesMails.tableName)
        .notNullable();
      table.enum('event_type', [
        LegalEntitiesMailsAuditTrails.TYPES.MAIL_RECEIVED
      ]);
      table.datetime('event_time');
      table.timestamps();
    }
  );

  await knex.schema.createTable(
    LegalEntitiesMailsAuditTrailsDetails.tableName,
    table => {
      table.increments('id').primary();
      table
        .integer('legal_entities_mails_audit_trail_id')
        .references('id')
        .inTable(LegalEntitiesMailsAuditTrails.tableName)
        .notNullable();
      table.jsonb('data');
    }
  );

  await knex.schema.createTable(
    `${LegalEntities.tableName}_${Emails.tableName}`,
    table => {
      table
        .integer('legal_entity_id')
        .references('id')
        .inTable(LegalEntities.tableName)
        .notNullable();
      table
        .integer('email_id')
        .references('id')
        .inTable(Emails.tableName)
        .notNullable();
      table.unique(['legal_entity_id', 'email_id']);
    }
  );

  await knex.schema.createTable(
    `${LegalEntities.tableName}_${Phones.tableName}`,
    table => {
      table
        .integer('legal_entity_id')
        .references('id')
        .inTable(LegalEntities.tableName)
        .notNullable();
      table
        .integer('phone_id')
        .references('id')
        .inTable(Phones.tableName)
        .notNullable();
      table.unique(['legal_entity_id', 'phone_id']);
    }
  );
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists(
    `${LegalEntities.tableName}_${Phones.tableName}`
  );
  await knex.schema.dropTableIfExists(
    `${LegalEntities.tableName}_${Emails.tableName}`
  );
  await knex.schema.dropTableIfExists(
    LegalEntitiesMailsAuditTrailsDetails.tableName
  );
  await knex.schema.dropTableIfExists(LegalEntitiesMailsAuditTrails.tableName);
  await knex.schema.dropTableIfExists(LegalEntitiesMails.tableName);
  await knex.schema.dropTableIfExists(LegalEntitiesVersion.tableName);
  await knex.schema.dropTableIfExists(LegalEntities.tableName);
  await knex.schema.dropTableIfExists(MailSubjects.tableName);
  await knex.schema.dropTableIfExists(MailSenders.tableName);
  await knex.schema.dropTableIfExists(MailSenderNames.tableName);
  await knex.schema.dropTableIfExists(Addresses.tableName);
  await knex.schema.dropTableIfExists(Users.tableName);
  await knex.schema.dropTableIfExists(DocumentsDetails.tableName);
  await knex.schema.dropTableIfExists(Documents.tableName);
  await knex.schema.dropTableIfExists(Emails.tableName);
  await knex.schema.dropTableIfExists(Phones.tableName);
  await knex.schema.dropTableIfExists(Cities.tableName);
  await knex.schema.dropTableIfExists(Countries.tableName);
};
