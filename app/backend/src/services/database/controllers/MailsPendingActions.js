class MailPendingActions {
  constructor({ models, nodeModules, recordPreparator }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.recordPreparator = recordPreparator;
  }

  static flattenRecord(record) {
    return {
      id: record.id,
      legal_entity_name: record.mail.legal_entity.long_name,
      mail_subject: record.mail.subject.long_subject,
      mail_document_name: record.mail.document.name,
      action: record.action,
      reason: record.reason,
      created_at: record.created_at,
      updated_at: record.updated_at
    };
  }

  async findAllPendingEmailNotifications({ transaction }) {
    const dbRecords = await this.models.MailsPendingActions.query(transaction)
      .where({
        action: this.models.MailsPendingActions.ACTIONS
          .CONFIRM_SENDING_EMAIL_NOTIFICATION,
        pending: true
      })
      .eager('mail.[document, legal_entity, subject, sender]');

    return dbRecords.map(dbRecord => {
      const flattenedDbRecord = MailPendingActions.flattenRecord(dbRecord);

      return this.recordPreparator.prepareDbRecordForReturn(flattenedDbRecord);
    });
  }
}

module.exports = MailPendingActions;
