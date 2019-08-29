const {} = require("../../constants");

class LegalEntities {
  constructor({
    models,
    nodeModules
  }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this._prepareInputForDbInsert = this._prepareInputForDbInsert.bind(this);
    this.create = this.create.bind(this);
    this.findAllVersions = this.findAllVersions.bind(this);
    this.update = this.update.bind(this);
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

    !_.isUndefined(shortName) && _.set(final, "short_name", shortName);
    !_.isUndefined(longName) && _.set(final, "long_name", longName);
    !_.isUndefined(type) && _.set(final, "type", type);
    !_.isUndefined(registrationId) && _.set(final, "registration_id", registrationId);
    !_.isUndefined(taxId) && _.set(final, "tax_id", taxId);
    !_.isUndefined(permanentAddressId) && _.set(final, "permanent_address_id", permanentAddressId);
    !_.isUndefined(version) && _.set(final, "version", version);
    !_.isUndefined(versionStartAt) && _.set(final, "version_start_at", versionStartAt);
    !_.isUndefined(versionEndAt) && _.set(final, "version_end_at", versionEndAt);

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
    return await this.models.LegalEntities
      .query(transaction)
      .insert(this._prepareInputForDbInsert({
        shortName,
        longName,
        type,
        registrationId,
        taxId,
        permanentAddressId,
        version: 0,
        versionStartAt: new Date()
      }));
  }

  async findAllVersions({
    transaction
  }) {

  }

  async update({
    id,
    transaction,
    ...inputs
  }) {
    const updatedAt = new Date();
    const beforeUpdateLegalEntity = await this.models.LegalEntities
      .query(transaction)
      .findById(id);

    await this.models.LegalEntitiesVersion
      .query(transaction)
      .insert({
        legal_entity_id: id,
        short_name: beforeUpdateLegalEntity["short_name"],
        long_name: beforeUpdateLegalEntity["long_name"],
        type: beforeUpdateLegalEntity["type"],
        registration_id: beforeUpdateLegalEntity["registration_id"],
        tax_id: beforeUpdateLegalEntity["tax_id"],
        permanent_address_id: beforeUpdateLegalEntity["permanent_address_id"],
        version: beforeUpdateLegalEntity["version"],
        version_start_at: beforeUpdateLegalEntity["version_start_at"],
        version_end_at: updatedAt
      });

    await this.models.LegalEntities
      .query(transaction)
      .findById(id)
      .patch(this._prepareInputForDbInsert({
        ...inputs,
        ...{
          version: beforeUpdateLegalEntity["version"] + 1,
          versionStartAt: updatedAt
        }
      }));

    return {
      current: await this.models.LegalEntities
        .query(transaction)
        .findById(id),
      versions: await this.models.LegalEntitiesVersion
        .query(transaction)
        .where({
          legal_entity_id: id
        })
    };
  }
}

module.exports = LegalEntities;