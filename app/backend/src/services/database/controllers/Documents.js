class Documents {
  constructor({ models, nodeModules }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.create = this.create.bind(this);
  }

  async create({ file, mimetype, extension, name, type, transaction }) {
    const documentRecord = await this.models.Documents.query(
      transaction
    ).insert({
      name,
      type
    });

    await this.models.DocumentsDetails.query(transaction).insert({
      id: documentRecord['id'],
      aws_storage_details: null
    });

    await this.models.DocumentsTemporary.query(transaction).insert({
      id: this.nodeModules.uuidv4(),
      document_id: documentRecord['id'],
      file: file,
      mimetype,
      extension
    });

    return {
      id: documentRecord['id']
    };
  }
}

module.exports = Documents;
