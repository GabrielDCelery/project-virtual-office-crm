class RecordPreparator {
  constructor({ nodeModules }) {
    this.jsonSchema = null;
    this.nodeModules = nodeModules;
    this.prepareDbRecordForReturn = this.prepareDbRecordForReturn.bind(this);
    this.prepareRecordForDbInsert = this.prepareRecordForDbInsert.bind(this);
  }

  setJsonSchema(jsonSchema) {
    this.jsonSchema = jsonSchema;

    return this;
  }

  flattenRecord() {}

  prepareDbRecordForReturn(dbRecord) {
    const _ = this.nodeModules.lodash;
    const final = {};

    _.forEach(dbRecord, (value, key) => {
      final[_.camelCase(key)] = value;
    });

    return final;
  }

  prepareRecordForDbInsert(recordToPrepare) {
    const _ = this.nodeModules.lodash;
    const final = {};

    _.forEach(recordToPrepare, (value, key) => {
      final[_.snakeCase(key)] = value;
    });

    return final;
  }

  prepareRecordForUpdate(recordToPrepare) {
    const _ = this.nodeModules.lodash;

    const final = {};

    _.forEach(recordToPrepare, (value, key) => {
      if (_.isNil(value)) {
        return;
      }

      final[_.snakeCase(key)] = value;
    });

    return final;
  }
}

module.exports = RecordPreparator;
