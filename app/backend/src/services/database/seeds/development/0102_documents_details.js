const { DocumentsDetails } = require('../../models');

exports.seed = async knex => {
  await knex(DocumentsDetails.tableName).insert([
    {
      id: 1,
      aws_storage_details: {
        Bucket: 'foo',
        Key: 'folder/20191111/foo'
      },
      created_at: new Date('2019-11-11T11:11:11.000Z'),
      updated_at: new Date('2019-11-11T11:11:11.000Z')
    },
    {
      id: 2,
      aws_storage_details: {
        Bucket: 'bar',
        Key: 'folder/20191111/bar'
      },
      created_at: new Date('2019-11-11T11:11:11.000Z'),
      updated_at: new Date('2019-11-11T11:11:11.000Z')
    }
  ]);
};
