module.exports = ({ services }) => {
  return async () => {
    const transaction = await services.get('database').createTransaction();

    const batchOfTemporaryDocumentsResult = await services
      .get('database')
      .execute('documentsTemporary', 'getNextBatch', {
        transaction,
        bKeepTransactionAlive: true
      });

    if (!batchOfTemporaryDocumentsResult.success) {
      return {
        ...batchOfTemporaryDocumentsResult,
        bRunAgain: true
      };
    }

    if (batchOfTemporaryDocumentsResult.payload.length === 0) {
      await services.get('database').commitTransaction({ transaction });
      return {
        ...batchOfTemporaryDocumentsResult,
        bRunAgain: false
      };
    }

    const documentsCloudInserts = [];

    for (
      let i = 0, iMax = batchOfTemporaryDocumentsResult.payload.length;
      i < iMax;
      i++
    ) {
      const dbRecord = batchOfTemporaryDocumentsResult.payload[i];
      const {
        documentExtension,
        documentFile,
        documentId,
        documentMimetype,
        documentName,
        documentSize,
        documentType
      } = dbRecord;
      const fileName = `${documentName}.${documentExtension}`;

      const uploadFileToBucketResult = await services
        .get('cloud')
        .execute('s3', 'uploadFileToBucket', {
          bucket: documentType.toLowerCase().replace(/\s/g, '_'),
          file: documentFile,
          fileName
        });

      if (!uploadFileToBucketResult.success) {
        await services.get('database').rollbackTransaction({ transaction });
        return {
          ...uploadFileToBucketResult,
          bRunAgain: true
        };
      }

      documentsCloudInserts.push({
        documentId,
        extension: documentExtension,
        mimetype: documentMimetype,
        size: documentSize,
        storageDetails: uploadFileToBucketResult.payload
      });
    }

    const saveCloudRecordResults = await services
      .get('database')
      .execute('documentsCloud', 'createBulk', {
        inserts: documentsCloudInserts,
        transaction,
        bKeepTransactionAlive: true
      });

    if (!saveCloudRecordResults.success) {
      return {
        ...saveCloudRecordResults,
        bRunAgain: true
      };
    }

    const deleteTemporaryResults = await services
      .get('database')
      .execute('documentsTemporary', 'delete', {
        ids: batchOfTemporaryDocumentsResult.payload.map(
          record => record['documentTemporaryId']
        ),
        transaction
      });

    return {
      ...deleteTemporaryResults,
      bRunAgain: true
    };
  };
};
