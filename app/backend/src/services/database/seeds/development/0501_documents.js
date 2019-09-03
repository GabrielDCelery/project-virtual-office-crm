const { Documents } = require('../../models');

exports.seed = async knex => {
  await knex(Documents.tableName).insert([
    {
      id: 1,
      name: 'foo',
      type: Documents.TYPES.IDENTITY_CARD
    },
    {
      id: 2,
      name: 'bar',
      type: Documents.TYPES.MAIL
    }
  ]);

  await knex.raw(
    `select setval('${Documents.tableName}_id_seq', max(id)) from ${Documents.tableName}`
  );
};
