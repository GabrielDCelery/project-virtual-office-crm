class MailSenderNames {
  constructor({ models, nodeModules, recordPreparator }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.recordPreparator = recordPreparator;
    this.findAll = this.findAll.bind(this);
  }

  async findAll({ transaction }) {
    const mailSenderNames = await this.models.MailSenderNames.query(
      transaction
    );

    return mailSenderNames.map(dbRecord => {
      return this.recordPreparator.prepareDbRecordForReturn(dbRecord);
    });
  }
}

module.exports = MailSenderNames;
