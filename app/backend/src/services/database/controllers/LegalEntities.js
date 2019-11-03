class LegalEntities {
  constructor({ models, nodeModules, recordPreparator }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.recordPreparator = recordPreparator;
    this.create = this.create.bind(this);
    this.getAllVersionsOfSingleEntity = this.getAllVersionsOfSingleEntity.bind(
      this
    );
    this.getAllVersionsOfAllEntities = this.getAllVersionsOfAllEntities.bind(
      this
    );
    this.update = this.update.bind(this);
  }

  static _normalizeShortVersionRecord(record) {
    return {
      legal_entity_id: record['legal_entity_id'] || record['id'],
      long_name: record['long_name'],
      type: record['type']
    };
  }

  static _normalizeVersionRecord(record) {
    return {
      legal_entity_id: record['legal_entity_id'] || record['id'],
      short_name: record['short_name'],
      long_name: record['long_name'],
      type: record['type'],
      registration_id: record['registration_id'],
      long_name: record['long_name'],
      tax_id: record['tax_id'],
      permanent_address_id: record['permanent_address_id'],
      version: record['version'],
      version_start_at: record['version_start_at'],
      version_end_at: record['version_end_at'] || null
    };
  }

  async create({
    shortName,
    longName,
    type,
    registrationId,
    taxId,
    permanentAddressId,
    transaction
  }) {
    const preparedRecordForInsert = this.recordPreparator.prepareRecordForDbInsert(
      {
        shortName,
        longName,
        type,
        registrationId,
        taxId,
        permanentAddressId,
        version: 0,
        versionStartAt: new Date()
      }
    );
    const dbRecord = await this.models.LegalEntities.query(transaction).insert(
      preparedRecordForInsert
    );
    return this.recordPreparator.prepareDbRecordForReturn(dbRecord);
  }

  async getAllVersionsOfSingleEntity({ id, transaction }) {
    const latestVersionLegalEntity = await this.models.LegalEntities.query(
      transaction
    ).findById(id);
    const previousVersionsOfLegalEntity = await this.models.LegalEntitiesVersion.query(
      transaction
    )
      .where({
        legal_entity_id: id
      })
      .orderBy('version', 'DESC');

    return [latestVersionLegalEntity, ...previousVersionsOfLegalEntity].map(
      dbRecord => {
        const normalizedDbRecord = LegalEntities._normalizeVersionRecord(
          dbRecord
        );
        return this.recordPreparator.prepareDbRecordForReturn(
          normalizedDbRecord
        );
      }
    );
  }

  async getAllVersionsOfAllEntities({ transaction }) {
    const _ = this.nodeModules.lodash;
    const latestVersionsOfLegalEntities = await this.models.LegalEntities.query(
      transaction
    ).select('id', 'long_name', 'type');

    const previousVersionsOfLegalEntities = await this.models.LegalEntitiesVersion.query(
      transaction
    ).select('legal_entity_id', 'long_name', 'type');

    return _.chain([
      ...latestVersionsOfLegalEntities,
      ...previousVersionsOfLegalEntities
    ])
      .uniqBy('long_name')
      .map(dbRecord => {
        const normalizedShortDbRecord = LegalEntities._normalizeShortVersionRecord(
          dbRecord
        );

        return this.recordPreparator.prepareDbRecordForReturn(
          normalizedShortDbRecord
        );
      })
      .value();
  }

  async getLatestVersionsOfAllEntities({ transaction }) {
    const dbRecords = await this.models.LegalEntities.query(transaction);

    return dbRecords.map(dbRecord => {
      return this.recordPreparator.prepareDbRecordForReturn(dbRecord);
    });
  }

  async update({ id, transaction, ...inputs }) {
    const updatedAt = new Date();
    const beforeUpdateLegalEntity = await this.models.LegalEntities.query(
      transaction
    ).findById(id);

    await this.models.LegalEntitiesVersion.query(transaction).insert({
      legal_entity_id: id,
      short_name: beforeUpdateLegalEntity['short_name'],
      long_name: beforeUpdateLegalEntity['long_name'],
      type: beforeUpdateLegalEntity['type'],
      registration_id: beforeUpdateLegalEntity['registration_id'],
      tax_id: beforeUpdateLegalEntity['tax_id'],
      permanent_address_id: beforeUpdateLegalEntity['permanent_address_id'],
      version: beforeUpdateLegalEntity['version'],
      version_start_at: beforeUpdateLegalEntity['version_start_at'],
      version_end_at: updatedAt
    });

    await this.models.LegalEntities.query(transaction)
      .findById(id)
      .patch(
        this.recordPreparator.prepareRecordForUpdate({
          ...inputs,
          ...{
            version: beforeUpdateLegalEntity['version'] + 1,
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

module.exports = LegalEntities;
