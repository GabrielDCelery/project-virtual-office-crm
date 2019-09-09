const { MailSenderNames } = require('../../models');

exports.seed = async knex => {
  await knex(MailSenderNames.tableName).insert([
    {
      id: 1,
      name: 'John Doe'
    },
    {
      id: 2,
      name: 'Uzsoki Utcai Kórház'
    },
    {
      id: 3,
      name: 'Nemzeti Sportközpontok'
    },
    {
      id: 4,
      name: 'NAV'
    },
    {
      id: 5,
      name: 'Lux Hungária Kft.'
    },
    {
      id: 6,
      name: 'IT Services'
    },
    {
      id: 7,
      name: 'UniCredit Bank'
    },
    {
      id: 8,
      name: 'Magyar Posta'
    },
    {
      id: 9,
      name: 'Hajdú-Bihar Megyei Kormányhivatal'
    },
    {
      id: 10,
      name: 'Debreceni Gyógyfürdő Kft.'
    }
  ]);

  await knex.raw(
    `select setval('${MailSenderNames.tableName}_id_seq', max(id)) from ${MailSenderNames.tableName}`
  );
};