const HistoryRecordChanges = require('./HistoryRecordChanges');

class NaturalPeople {
  constructor({ models, nodeModules, recordPreparator }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.recordPreparator = recordPreparator;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getLatestVersionsOfAllRecords = this.getLatestVersionsOfAllRecords.bind(
      this
    );
    this.getAllVersionsOfSingleRecord = this.getAllVersionsOfSingleRecord.bind(
      this
    );
    this.getAllVersionsOfAllRecords = this.getAllVersionsOfAllRecords.bind(
      this
    );
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

  async update({ id, transaction, ...inputs }) {
    const {
      prepareDbRecordForReturn,
      prepareRecordForUpdate,
      prepareRecordForDbInsert
    } = this.recordPreparator;

    const oldRecord = await this.models.NaturalPeople.query(
      transaction
    ).findById(id);
    const preparedRecordForUpdate = prepareRecordForUpdate({ ...inputs });
    const preparedHistoryRecords = HistoryRecordChanges.createRecordsForUpdate({
      tableName: this.models.NaturalPeople.tableName,
      recordId: oldRecord['id'],
      oldRecord: oldRecord,
      newRecordUpdates: preparedRecordForUpdate
    }).map(prepareRecordForDbInsert);

    await this.models.NaturalPeople.query(transaction)
      .findById(id)
      .patch(preparedRecordForUpdate);

    await this.models.HistoryRecordChanges.query(transaction).insert(
      preparedHistoryRecords
    );

    return prepareDbRecordForReturn(
      await this.models.NaturalPeople.query(transaction).findById(id)
    );
  }

  async getLatestVersionsOfAllRecords({ transaction }) {
    const { prepareDbRecordForReturn } = this.recordPreparator;
    const records = await this.models.NaturalPeople.query(transaction);

    return records.map(prepareDbRecordForReturn);
  }

  async getAllVersionsOfSingleRecord({ id, transaction }) {
    const { prepareDbRecordForReturn } = this.recordPreparator;
    const record = await this.models.NaturalPeople.query(transaction).findById(
      id
    );
    const changes = await this.models.HistoryRecordChanges.query(
      transaction
    ).where({
      table: this.models.NaturalPeople.tableName,
      record_id: id
    });

    return HistoryRecordChanges.getAllVersionsOfRecord({
      record,
      changes
    }).map(prepareDbRecordForReturn);
  }

  async getAllVersionsOfAllRecords({ transaction }) {
    const { prepareDbRecordForReturn } = this.recordPreparator;
    const records = await this.models.NaturalPeople.query(transaction);

    const changes = await this.models.HistoryRecordChanges.query(
      transaction
    ).where({
      table: this.models.NaturalPeople.tableName
    });

    return HistoryRecordChanges.getAllVersionsOfRecords({
      records,
      changes
    }).map(prepareDbRecordForReturn);
  }
}

module.exports = NaturalPeople;
