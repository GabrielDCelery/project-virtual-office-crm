import actions_old from './actions_old';
import { actionFindAllCities, actionSetSelectedCity } from './cities';
import { actionFindAllCountries, actionSetSelectedCountry } from './countries';
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
  actionFindAllMailSubjects,
  actionSetSelectedMailSubject
} from './mailSubjects';
import { actionGetAllVersionsOfAllEntities } from './legalEntities';

export default {
  actionFindAllMailSubjects,
  actionSetSelectedMailSubject,
  actionCreateNewMailSenderNameAndReFetch,
  actionFindAllCities,
  actionFindAllCountries,
  actionFindAllMailSenderNames,
  actionFindAllMailSenders,
  actionSetSelectedCity,
  actionSetSelectedCountry,
  actionSetSelectedMailSender,
  actionSetSelectedMailSenderName,
  addresses: actions_old.addresses,
  cities: {
    findAll: actionFindAllCities
  },
  user: actions_old.user,
  legalEntities: {
    getAllVersionsOfAllEntities: actionGetAllVersionsOfAllEntities
  }
};
