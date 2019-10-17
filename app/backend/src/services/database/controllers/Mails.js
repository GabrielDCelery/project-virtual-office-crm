class Mails {
  constructor({ models, nodeModules, recordPreparator }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.recordPreparator = recordPreparator;
    this.create = this.create.bind(this);
  }

  _findOrCreateSender({ sender, transaction }) {}

  async create({ receiver, sender, subject, document, file, transaction }) {
    const { uuidv4 } = this.nodeModules;

    const newDocumentDbRecord = await this.models.Documents.query(
      transaction
    ).insert({
      name: document['name'],
      type: this.models.Documents.TYPES.MAIL
    });

    const documentId = newDocumentDbRecord['id'];

    await this.models.DocumentsTemporary.query(transaction).insert({
      id: uuidv4(),
      document_id: documentId,
      file: file['buffer'],
      mimetype: file['mimetype'],
      extension: file['originalname'].split('.')[1]
    });

    //const senderDbRecord = this._findOrCreateSender({ sender, transaction });

    await this.models.Mails.query(transaction).insert({
      legal_entity_id: receiver,
      sender_id: sender,
      subject_id: subject,
      document_id: documentId
    });

    return true;
  }
}

module.exports = Mails;
