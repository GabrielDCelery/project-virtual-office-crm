class NaturalPeople {
  constructor({ models, nodeModules, recordPreparator }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.recordPreparator = recordPreparator;
    this.create = this.create.bind(this);
    this.getLatestVersionsOfAllEntities = this.getLatestVersionsOfAllEntities.bind(
      this
    );
  }

  static _normalizeShortVersionRecord(record) {
    return {
      natural_person_id: record['natural_person_id'] || record['id'],
      first_name: record['first_name'],
      last_name: record['last_name'],
      mother_name: record['mother_name']
    };
  }

  static _normalizeVersionRecord(record) {
    return {
      natural_person_id: record['natural_person_id'] || record['id'],
      first_name: record['first_name'],
      last_name: record['last_name'],
      mother_name: record['mother_name'],
      birth_date: record['birth_date'],
      identifier_document_id: record['identifier_document_id'],
      permanent_address_id: record['permanent_address_id'],
      version: record['version'],
      version_start_at: record['version_start_at'],
      version_end_at: record['version_end_at'] || null
    };
  }

  async create({
    firstName,
    lastName,
    motherName,
    birthDate,
    identifierDocumentId,
    permanentAddressId,
    transaction
  }) {
    const {
      prepareRecordForDbInsert,
      prepareDbRecordForReturn
    } = this.recordPreparator;

    const preparedRecordForInsert = prepareRecordForDbInsert({
      firstName,
      lastName,
      motherName,
      birthDate,
      identifierDocumentId,
      permanentAddressId,
      version: 0,
      versionStartAt: new Date()
    });
    const dbRecord = await this.models.NaturalPeople.query(transaction).insert(
      preparedRecordForInsert
    );
    return prepareDbRecordForReturn(dbRecord);
  }

  async getAllVersionsOfSingleEntity({ id, transaction }) {
    const latestVersion = await this.models.NaturalPeople.query(
      transaction
    ).findById(id);
    const previousVersions = await this.models.NaturalPeopleVersion.query(
      transaction
    )
      .where({ natural_person_id: id })
      .orderBy('version', 'DESC');

    return [latestVersion, ...previousVersions].map(dbRecord => {
      const normalizedDbRecord = NaturalPeople._normalizeVersionRecord(
        dbRecord
      );
      return this.recordPreparator.prepareDbRecordForReturn(normalizedDbRecord);
    });
  }

  async getAllVersionsOfAllEntities({ transaction }) {
    const _ = this.nodeModules.lodash;
    const latestVersions = await this.models.NaturalPeople.query(
      transaction
    ).select('id', 'first_name', 'last_name', 'mother_name');

    const previousVersions = await this.models.NaturalPeopleVersion.query(
      transaction
    ).select('natural_person_id', 'first_name', 'last_name', 'mother_name');

    return _.chain([...latestVersions, ...previousVersions])
      .uniqBy(({ first_name, last_name, mother_name }) => {
        return `${first_name} ${last_name} ${mother_name}`;
      })
      .map(dbRecord => {
        const normalizedShortDbRecord = NaturalPeople._normalizeShortVersionRecord(
          dbRecord
        );

        return this.recordPreparator.prepareDbRecordForReturn(
          normalizedShortDbRecord
        );
      })
      .value();
  }

  async getLatestVersionsOfAllEntities({ transaction }) {
    const dbRecords = await this.models.NaturalPeople.query(transaction);

    return dbRecords.map(dbRecord => {
      return this.recordPreparator.prepareDbRecordForReturn(dbRecord);
    });
  }

  async update({ id, transaction, ...inputs }) {
    const updatedAt = new Date();
    const beforeUpdateNaturalPerson = await this.models.NaturalPeople.query(
      transaction
    ).findById(id);

    await this.models.NaturalPeopleVersion.query(transaction).insert({
      natural_person_id: id,
      first_name: beforeUpdateNaturalPerson['first_name'],
      last_name: beforeUpdateNaturalPerson['last_name'],
      mother_name: beforeUpdateNaturalPerson['mother_name'],
      birth_date: beforeUpdateNaturalPerson['birth_date'],
      identifier_document_id:
        beforeUpdateNaturalPerson['identifier_document_id'],
      permanent_address_id: beforeUpdateNaturalPerson['permanent_address_id'],
      version: beforeUpdateNaturalPerson['version'],
      version_start_at: beforeUpdateNaturalPerson['version_start_at'],
      version_end_at: updatedAt
    });

    await this.models.NaturalPeople.query(transaction)
      .findById(id)
      .patch(
        this.recordPreparator.prepareRecordForUpdate({
          ...inputs,
          ...{
            version: beforeUpdateNaturalPerson['version'] + 1,
            versionStartAt: updatedAt
          }
        })
      );

    return await this.getAllVersionsOfSingleEntity({
      id,
      transaction
    });
  }
}

module.exports = NaturalPeople;
