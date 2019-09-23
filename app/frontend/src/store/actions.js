import actions_old from './actions_old';
import { actionFindAllCities } from './cities';
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
import { actionFindAllMailSubjects } from './mailSubjects';
import { actionGetAllVersionsOfAllEntities } from './legalEntities';

export default {
  actionCreateNewMailSenderNameAndReFetch,
  actionFindAllMailSenderNames,
  actionFindAllMailSenders,
  actionFindAllMailSubjects,
  actionSetSelectedMailSender,
  actionSetSelectedMailSenderName,
  actionFindAllCountries,
  actionSetSelectedCountry,
  addresses: actions_old.addresses,
  cities: {
    findAll: actionFindAllCities
  },
  user: actions_old.user,
  legalEntities: {
    getAllVersionsOfAllEntities: actionGetAllVersionsOfAllEntities
  }
};
