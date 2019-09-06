class LegalEntities {
  constructor({ models, nodeModules }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this._normalizeVersionRecord = this._normalizeVersionRecord.bind(this);
    this._prepareInputForDbInsert = this._prepareInputForDbInsert.bind(this);
    this.create = this.create.bind(this);
    this.getAllVersionsOfSingleEntity = this.getAllVersionsOfSingleEntity.bind(
      this
    );
    this.update = this.update.bind(this);
  }

  _normalizeShortVersionRecord(record) {
    return {
      legal_entity_id: record['legal_entity_id'] || record['id'],
      long_name: record['long_name'],
      type: record['type']
    };
  }

  _normalizeVersionRecord(record) {
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

  _prepareInputForDbInsert({
    shortName,
    longName,
    type,
    registrationId,
    taxId,
    permanentAddressId,
    version,
    versionStartAt,
    versionEndAt
  }) {
    const _ = this.nodeModules.lodash;
    let final = {};

    !_.isUndefined(shortName) && _.set(final, 'short_name', shortName);
    !_.isUndefined(longName) && _.set(final, 'long_name', longName);
    !_.isUndefined(type) && _.set(final, 'type', type);
    !_.isUndefined(registrationId) &&
      _.set(final, 'registration_id', registrationId);
    !_.isUndefined(taxId) && _.set(final, 'tax_id', taxId);
    !_.isUndefined(permanentAddressId) &&
      _.set(final, 'permanent_address_id', permanentAddressId);
    !_.isUndefined(version) && _.set(final, 'version', version);
    !_.isUndefined(versionStartAt) &&
      _.set(final, 'version_start_at', versionStartAt);
    !_.isUndefined(versionEndAt) &&
      _.set(final, 'version_end_at', versionEndAt);

    return final;
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
    return await this.models.LegalEntities.query(transaction).insert(
      this._prepareInputForDbInsert({
        shortName,
        longName,
        type,
        registrationId,
        taxId,
        permanentAddressId,
        version: 0,
        versionStartAt: new Date()
      })
    );
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

    return [
      this._normalizeVersionRecord(latestVersionLegalEntity),
      ...previousVersionsOfLegalEntity.map(this._normalizeVersionRecord)
    ];
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
      .map(this._normalizeShortVersionRecord)
      .value();
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
        this._prepareInputForDbInsert({
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
