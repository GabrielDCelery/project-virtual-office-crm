class Documents {
  constructor({ models, nodeModules }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.create = this.create.bind(this);
  }

  async create({ awsStorageDetails, name, type, transaction }) {
    const documentRecord = await this.models.Documents.query(
      transaction
    ).insert({
      name,
      type
    });

    await this.models.DocumentsDetails.query(transaction).insert({
      id: documentRecord['id'],
      aws_storage_details: awsStorageDetails
    });

    return {
      id: documentRecord['id']
    };
  }
}

module.exports = Documents;
