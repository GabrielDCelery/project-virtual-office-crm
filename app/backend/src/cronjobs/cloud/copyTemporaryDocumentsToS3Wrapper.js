module.exports = ({ services }) => {
  return async () => {
    const batchOfTemporaryDocumentsResult = await services
      .get('database')
      .execute('documentsTemporary', 'getNextBatch');

    for (
      let i = 0, iMax = batchOfTemporaryDocumentsResult.payload.length;
      i < iMax;
      i++
    ) {
      const dbRecord = batchOfTemporaryDocumentsResult.payload[i];
      const {
        documentName,
        documentFile,
        documentExtension,
        documentType
      } = dbRecord;
      const fileName = `${documentName}.${documentExtension}`;

      const uploadFileToBucketResult = await services
        .get('cloud')
        .execute('s3', 'uploadFileToBucket', {
          bucket: documentType,
          file: documentFile,
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
