class DocumentsTemporary {
  constructor({ models, nodeModules, recordPreparator }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.recordPreparator = recordPreparator;
    this.getNextBatch = this.getNextBatch.bind(this);
  }

  async getNextBatch({ transaction }) {
    const dbRecords = await this.models.DocumentsTemporary.query(
      transaction
    ).eager('document');

    const { flattenDbRecord, prepareDbRecordForReturn } = this.recordPreparator;

    return dbRecords.map(dbRecord => {
      const flattenedDbRecord = flattenDbRecord({
        dbRecord,
        fieldsMap: {
          document_id: 'document.id',
          document_name: 'document.name',
          document_mimetype: 'mimetype',
          document_extension: 'extension',
          document_file: 'file',
          document_type: 'document.type',
          document_size: 'size',
          document_temporary_id: 'id'
        }
      });

      return prepareDbRecordForReturn(flattenedDbRecord);
    });
  }
}

module.exports = DocumentsTemporary;
