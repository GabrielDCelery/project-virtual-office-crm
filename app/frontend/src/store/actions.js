import actions_old from './actions_old';
import { actionFindAllCities } from './cities';
import { actionFindAllCountries } from './countries';
import { actionFindAllMailSenderNames } from './mailSenderNames';
import { actionFindAllMailSenders } from './mailSenders';
import { actionFindAllMailSubjects } from './mailSubjects';
import { actionGetAllVersionsOfAllEntities } from './legalEntities';

export default {
  addresses: actions_old.addresses,
  countries: {
    findAll: actionFindAllCountries
  },
  cities: {
    findAll: actionFindAllCities
  },
  user: actions_old.user,
  legalEntities: {
    getAllVersionsOfAllEntities: actionGetAllVersionsOfAllEntities
  },
  mails: {
    findAllMailSenders: actionFindAllMailSenders,
    findAllMailSenderNames: actionFindAllMailSenderNames,
    findAllMailSubjects: actionFindAllMailSubjects
  }
};
