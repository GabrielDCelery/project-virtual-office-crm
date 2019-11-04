class NaturalPeople {
  constructor({ models, nodeModules, recordPreparator }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.recordPreparator = recordPreparator;
    this.create = this.create.bind(this);
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

    return prepareDbRecordForReturn(
      await this.models.NaturalPeople.query(transaction).insert(
        prepareRecordForDbInsert({
          firstName,
          lastName,
          motherName,
          birthDate,
          identifierDocumentId,
          permanentAddressId
        })
      )
    );
  }
}

module.exports = NaturalPeople;
