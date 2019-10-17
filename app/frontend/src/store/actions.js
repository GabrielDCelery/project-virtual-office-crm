import actions_old from './actions_old';
import { actionFindAllCities, actionSetSelectedCity } from './cities';
import { actionFindAllCountries, actionSetSelectedCountry } from './countries';
import { actionCreateNewMail } from './mailCreate';
import {
  actionCreateNewMailSenderNameAndReFetch,
  actionFindAllMailSenderNames,
  actionSetSelectedMailSenderName
} from './mailSenderNames';
import {
  actionFindAllMailSenders,
  actionSetSelectedMailSender
} from './mailSenders';
import {
  actionCreateNewMailSubjectAndReFetch,
  actionFindAllMailSubjects,
  actionSetSelectedMailSubject
} from './mailSubjects';
import { actionGetAllVersionsOfAllEntities } from './legalEntities';

export default {
  actionCreateNewMail,
  actionCreateNewMailSenderNameAndReFetch,
  actionCreateNewMailSubjectAndReFetch,
  actionFindAllCities,
  actionFindAllCountries,
  actionFindAllMailSenderNames,
  actionFindAllMailSenders,
  actionFindAllMailSubjects,
  actionSetSelectedCity,
  actionSetSelectedCountry,
  actionSetSelectedMailSender,
  actionSetSelectedMailSenderName,
  actionSetSelectedMailSubject,
  addresses: actions_old.addresses,
  cities: {
    findAll: actionFindAllCities
  },
  user: actions_old.user,
  legalEntities: {
    getAllVersionsOfAllEntities: actionGetAllVersionsOfAllEntities
  }
};
