const { NaturalPeopleVersion } = require('../../models');

exports.seed = async knex => {
  await knex(NaturalPeopleVersion.tableName).insert([
    {
      id: 1,
      natural_person_id: 2,
      first_name: 'Thomas',
      last_name: 'Jefferson',
      mother_name: 'Jane Randolph Jefferson',
      birth_date: new Date('1743-04-13'),
      identifier_document_id: 1,
      permanent_address_id: 4,
      version: 0,
      version_start_at: new Date('2018-06-03T11:11:11'),
      version_end_at: new Date('2019-08-01T11:11:11')
    }
  ]);

  await knex.raw(
    `select setval('${NaturalPeopleVersion.tableName}_id_seq', max(id)) from ${NaturalPeopleVersion.tableName}`
  );
};
