class MailSubjects {
  constructor({ models, nodeModules, recordPreparator }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.recordPreparator = recordPreparator;
    this.findAll = this.findAll.bind(this);
  }

  async findAll({ transaction }) {
    const mailSubjects = await this.models.MailSubjects.query(transaction);

    return mailSubjects.map(dbRecord => {
      return this.recordPreparator.prepareDbRecordForReturn(dbRecord);
    });
  }
}

module.exports = MailSubjects;
