module.exports = ({ services }) => {
  return async () => {
    const findAllTemporaryDocumentsResult = await services
      .get('database')
      .execute(
        'mailsPendingActions',
        'findAllPendingCopyToCloudTemporaryDocuments'
      );

    if (!findAllTemporaryDocumentsResult.success) {
      return findAllTemporaryDocumentsResult;
    }

    if (findAllTemporaryDocumentsResult.payload.length === 0) {
      return {
        bRunAgain: false
      };
    }

    for (
      let i = 0, iMax = findAllTemporaryDocumentsResult.payload.length;
      i < iMax;
      i++
    ) {
      const dbRecord = findAllTemporaryDocumentsResult.payload[i];
      const {
        mailDocumentName,
        mailDocumentTemporarySaveFile,
        mailDocumentTemporarySaveExtension
      } = dbRecord;
      const fileName = `${mailDocumentName}.${mailDocumentTemporarySaveExtension}`;

      const uploadFileToBucketResult = await services
        .get('cloud')
        .execute('s3', 'uploadFileToMailsBucket', {
          file: mailDocumentTemporarySaveFile,
          fileName
        });

      if (!uploadFileToBucketResult.success) {
        return uploadFileToBucketResult;
      }

      console.log(uploadFileToBucketResult);
    }

    return {
      bRunAgain: true
    };
  };
};
