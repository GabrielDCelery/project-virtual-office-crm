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

  async sendEmailNotificationsForReceivedMails({ ids, transaction }) {
    const records = await this.models.MailsPendingActions.query(
      transaction
    ).whereIn('id', ids);

    const mailIds = this.nodeModules.lodash
      .chain(records)
      .map(record => record['mail_id'])
      .uniq()
      .value();

    await this.models.MailsPendingActions.query(transaction)
      .whereIn('id', ids)
      .patch({
        pending: false
      });

    await this.models.MailsPendingActions.query(transaction).insert(
      mailIds.map(mailId => {
        return {
          mail_id: mailId,
          action: this.models.MailsPendingActions.ACTIONS
            .SEND_EMAIL_NOTIFICATION,
          pending: true,
          reason: this.models.MailsPendingActions.REASONS.REQUESTED_BY_USER
        };
      })
    );

    await this.models.MailsAuditTrails.query(transaction).insert(
      mailIds.map(mailId => {
        return {
          mail_id: mailId,
          event_type: this.models.MailsAuditTrails.TYPES
            .EMAIL_NOTIFICATION_PENDING
        };
      })
    );

    return true;
  }
}

module.exports = MailPendingActions;
