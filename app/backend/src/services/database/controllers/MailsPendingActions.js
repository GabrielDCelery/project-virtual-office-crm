class MailPendingActions {
  constructor({ models, nodeModules, recordPreparator }) {
    this.models = models;
    this.nodeModules = nodeModules;
    this.recordPreparator = recordPreparator;
  }

  async findAllPendingEmailNotifications({ transaction }) {
    const dbRecords = await this.models.MailsPendingActions.query(transaction)
      .where({
        action: this.models.MailsPendingActions.ACTIONS
          .CONFIRM_SENDING_EMAIL_NOTIFICATION,
        pending: true
      })
      .eager('mail.[document, legal_entity, subject, sender]');

    const { flattenDbRecord, prepareDbRecordForReturn } = this.recordPreparator;

    return dbRecords.map(dbRecord => {
      const flattenedDbRecord = flattenDbRecord({
        dbRecord,
        fieldsMap: {
          id: 'id',
          legal_entity_name: 'mail.legal_entity.long_name',
          mail_subject: 'mail.subject.long_subject',
          mail_document_name: 'mail.document.name',
          action: 'action',
          reason: 'reason',
          created_at: 'created_at',
          updated_at: 'updated_at'
        }
      });

      return prepareDbRecordForReturn(flattenedDbRecord);
    });
  }

  async findAllPendingCopyToCloudTemporaryDocuments({ transaction }) {
    const dbRecords = await this.models.MailsPendingActions.query(transaction)
      .where({
        action: this.models.MailsPendingActions.ACTIONS
          .COPY_FROM_TEMPORARY_TO_CLOUD_S3_SERVICE,
        pending: true
      })
      .eager(
        'mail.[document.[temporary_saves], legal_entity, subject, sender]'
      );

    const recordsToReturn = [];

    const {
      flattenDbRecord,
      flattenEagerLoadedDbRecords,
      prepareDbRecordForReturn
    } = this.recordPreparator;

    dbRecords.forEach(dbRecord => {
      const temporarySavedDocuments = flattenEagerLoadedDbRecords({
        dbRecord,
        eagerLoadedRecordsPath: 'mail.document.temporary_saves',
        keyForEagerLoadedRecord: 'temporary_saved_document'
      });

      temporarySavedDocuments.forEach(temporarySavedDocument => {
        const flattenedDbRecord = flattenDbRecord({
          dbRecord: temporarySavedDocument,
          fieldsMap: {
            mail_pending_action_id: 'id',
            mail_document_name: 'mail.document.name',
            mail_document_temporary_save_id: 'temporary_saved_document.id',
            mail_document_temporary_save_file: 'temporary_saved_document.file',
            mail_document_temporary_save_mimetype:
              'temporary_saved_document.mimetype',
            mail_document_temporary_save_extension:
              'temporary_saved_document.extension'
          }
        });

        const preparedRecord = prepareDbRecordForReturn(flattenedDbRecord);

        recordsToReturn.push(preparedRecord);
      });
    });

    return recordsToReturn;
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
