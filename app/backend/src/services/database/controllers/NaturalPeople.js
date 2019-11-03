class NaturalPeople {
  constructor({ models, nodeModules, recordPreparator }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.recordPreparator = recordPreparator;
    this.getLatestVersionsOfAllEntities = this.getLatestVersionsOfAllEntities.bind(
      this
    );
  }

  async getLatestVersionsOfAllEntities({ transaction }) {
    const dbRecords = await this.models.NaturalPeople.query(transaction);

    return dbRecords.map(dbRecord => {
      return this.recordPreparator.prepareDbRecordForReturn(dbRecord);
    });
  }
}

module.exports = NaturalPeople;
