const {
  Addresses,
  Cities,
  Countries,
  Documents,
  DocumentsCloud,
  DocumentsTemporary,
  Emails,
  LegalEntities,
  LegalEntitiesVersion,
  MailSenderNames,
  MailSenders,
  MailSubjects,
  Mails,
  MailsAuditTrails,
  MailsAuditTrailsDetails,
  MailsPendingActions,
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
      .notNullable()
      .index();
    table.unique(['name', 'country_id']);
  });

  await knex.schema.createTable(Phones.tableName, table => {
    table.increments('id').primary();
    table.string('number').notNullable();
    table
      .integer('country_id')
      .references('id')
      .inTable(Countries.tableName)
      .notNullable()
      .index();
    table
      .enum('status', [Phones.STATUSES.ACTIVE, Phones.STATUSES.INACTIVE])
      .notNullable();
    table.enum('type', [Phones.TYPES.MOBILE, Phones.TYPES.HOME]).notNullable();
    table.unique(['country_id', 'number']);
  });

  await knex.schema.createTable(Emails.tableName, table => {
    table.increments('id').primary();
    table.string('address').notNullable();
    table
      .enum('status', [Emails.STATUSES.ACTIVE, Emails.STATUSES.INACTIVE])
      .notNullable();
  });

  await knex.schema.createTable(Documents.tableName, table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table
      .enum('type', [
        Documents.TYPES.DEED_OF_ASSOCIATION,
        Documents.TYPES.IDENTITY_CARD,
        Documents.TYPES.MAIL,
        Documents.TYPES.SPECIMEN_SIGNATURE
      ])
      .notNullable();
    table.timestamps();
  });

  await knex.schema.createTable(DocumentsTemporary.tableName, table => {
    table.uuid('id').primary();
    table
      .integer('document_id')
      .references('id')
      .inTable(Documents.tableName)
      .notNullable()
      .index();
    table.binary('file').notNullable();
    table
      .enum('mimetype', [DocumentsTemporary.MIMETYPES.APPLICATION_PDF])
      .notNullable();
    table.enum('extension', [DocumentsTemporary.EXTENSIONS.PDF]).notNullable();
    table.integer('size').notNullable();
    table.timestamps();
  });

  await knex.schema.createTable(DocumentsCloud.tableName, table => {
    table.uuid('id').primary();
    table
      .integer('document_id')
      .references('id')
      .inTable(Documents.tableName)
      .notNullable()
      .index();
    table.jsonb('storage_details').notNullable();
    table
      .enum('mimetype', [DocumentsCloud.MIMETYPES.APPLICATION_PDF])
      .notNullable();
    table.enum('extension', [DocumentsCloud.EXTENSIONS.PDF]).notNullable();
    table.integer('size').notNullable();
    table.timestamps();
  });

  await knex.schema.createTable(Users.tableName, table => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table
      .enum('status', [
        Users.STATUSES.INACTIVE,
        Users.STATUSES.ACTIVE,
        Users.STATUSES.SUSPENDED
      ])
      .defaultTo(Users.STATUSES.INACTIVE)
      .notNullable();
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
      .notNullable()
      .index();
    table.string('long_street').notNullable();
    table.timestamps();
    table.unique(['postcode', 'city_id', 'long_street']);
  });

  await knex.schema.createTable(MailSenderNames.tableName, table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.unique(['name']);
  });

  await knex.schema.createTable(MailSenders.tableName, table => {
    table.increments('id').primary();
    table
      .integer('address_id')
      .references('id')
      .inTable(Addresses.tableName)
      .notNullable()
      .index();
    table
      .integer('sender_name_id')
      .references('id')
      .inTable(MailSenderNames.tableName)
      .notNullable()
      .index();
    table.unique(['address_id', 'sender_name_id']);
  });

  await knex.schema.createTable(MailSubjects.tableName, table => {
    table.increments('id').primary();
    table.string('long_subject').notNullable();
    table.unique(['long_subject']);
  });

  await knex.schema.createTable(LegalEntities.tableName, table => {
    table.increments('id').primary();
    table.string('short_name').notNullable();
    table.string('long_name').notNullable();
    table
      .enum('type', [
        LegalEntities.TYPES.LIMITED_LIABILITY_COMPANY,
        LegalEntities.TYPES.UNLIMITED_PARTNERSHIP
      ])
      .notNullable();
    table.string('registration_id');
    table.string('tax_id');
    table.integer('permanent_address_id').notNullable();
    table.integer('version').notNullable();
    table.datetime('version_start_at').notNullable();
  });

  await knex.schema.createTable(LegalEntitiesVersion.tableName, table => {
    table.increments('id').primary();
    table.string('short_name').notNullable();
    table.string('long_name').notNullable();
    table
      .enum('type', [
        LegalEntitiesVersion.TYPES.LIMITED_LIABILITY_COMPANY,
        LegalEntitiesVersion.TYPES.UNLIMITED_PARTNERSHIP
      ])
      .notNullable();
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
      .notNullable()
      .index();
    table.integer('version').notNullable();
    table.datetime('version_start_at').notNullable();
    table.datetime('version_end_at').notNullable();
    table.unique(['legal_entity_id', 'version']);
  });

  await knex.schema.createTable(Mails.tableName, table => {
    table.increments('id').primary();
    table
      .integer('legal_entity_id')
      .references('id')
      .inTable(LegalEntities.tableName)
      .notNullable()
      .index();
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
      .notNullable()
      .index();
  });

  await knex.schema.createTable(MailsAuditTrails.tableName, table => {
    table.increments('id').primary();
    table
      .integer('mail_id')
      .references('id')
      .inTable(Mails.tableName)
      .notNullable()
      .index();
    table
      .enum('event_type', [
        MailsAuditTrails.TYPES.RECEIVED,
        MailsAuditTrails.TYPES.SAVED_TO_TEMPORARY_DATABASE,
        MailsAuditTrails.TYPES.COPIED_TO_CLOUD_SERVICE,
        MailsAuditTrails.TYPES.EMAIL_NOTIFICATION_PENDING,
        MailsAuditTrails.TYPES.EMAIL_NOTIFICATION_SENT_TO_LEGAL_ENTITY,
        MailsAuditTrails.TYPES.ENVELOPED_FOR_POSTING,
        MailsAuditTrails.TYPES.POSTED_TO_LEGAL_ENTITY
      ])
      .notNullable();
    table.timestamps();
  });

  await knex.schema.createTable(MailsAuditTrailsDetails.tableName, table => {
    table.uuid('id').primary();
    table
      .integer('mails_audit_trail_id')
      .references('id')
      .inTable(MailsAuditTrails.tableName)
      .notNullable();
    table.jsonb('data').notNullable();
  });

  await knex.schema.createTable(MailsPendingActions.tableName, table => {
    table.increments('id').primary();
    table
      .integer('mail_id')
      .references('id')
      .inTable(Mails.tableName)
      .notNullable()
      .index();
    table
      .enum('action', [
        MailsPendingActions.ACTIONS.CONFIRM_SENDING_EMAIL_NOTIFICATION,
        MailsPendingActions.ACTIONS.SEND_EMAIL_NOTIFICATION
      ])
      .notNullable();
    table
      .enum('reason', [
        MailsPendingActions.REASONS.RECEIVED_NEW_MAIL,
        MailsPendingActions.REASONS.REQUESTED_BY_USER
      ])
      .notNullable();
    table
      .boolean('pending')
      .defaultTo(true)
      .notNullable();
    table.timestamps();
    table.index(['action', 'pending']);
  });

  await knex.schema.createTable(
    `${LegalEntities.tableName}_${Emails.tableName}`,
    table => {
      table
        .integer('legal_entity_id')
        .references('id')
        .inTable(LegalEntities.tableName)
        .notNullable()
        .index();
      table
        .integer('email_id')
        .references('id')
        .inTable(Emails.tableName)
        .notNullable()
        .index();
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
        .notNullable()
        .index();
      table
        .integer('phone_id')
        .references('id')
        .inTable(Phones.tableName)
        .notNullable()
        .index();
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
  await knex.schema.dropTableIfExists(MailsPendingActions.tableName);
  await knex.schema.dropTableIfExists(MailsAuditTrailsDetails.tableName);
  await knex.schema.dropTableIfExists(MailsAuditTrails.tableName);
  await knex.schema.dropTableIfExists(Mails.tableName);
  await knex.schema.dropTableIfExists(LegalEntitiesVersion.tableName);
  await knex.schema.dropTableIfExists(LegalEntities.tableName);
  await knex.schema.dropTableIfExists(MailSubjects.tableName);
  await knex.schema.dropTableIfExists(MailSenders.tableName);
  await knex.schema.dropTableIfExists(MailSenderNames.tableName);
  await knex.schema.dropTableIfExists(Addresses.tableName);
  await knex.schema.dropTableIfExists(Users.tableName);
  await knex.schema.dropTableIfExists(DocumentsTemporary.tableName);
  await knex.schema.dropTableIfExists(DocumentsCloud.tableName);
  await knex.schema.dropTableIfExists(Documents.tableName);
  await knex.schema.dropTableIfExists(Emails.tableName);
  await knex.schema.dropTableIfExists(Phones.tableName);
  await knex.schema.dropTableIfExists(Cities.tableName);
  await knex.schema.dropTableIfExists(Countries.tableName);
};
