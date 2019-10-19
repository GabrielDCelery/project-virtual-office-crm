import actions_old from './actions_old';
import { actionFindAllCities, actionSetSelectedCity } from './cities';
import { actionFindAllCountries, actionSetSelectedCountry } from './countries';
import { actionCreateNewMail } from './mailCreate';
import {
  actionCreateNewMailSenderNameAndReFetch,
  actionCreateNewMailSubjectAndReFetch,
  actionFindAllMailSenderNames,
  actionFindAllMailSenders,
  actionFindAllMailSubjects,
  actionSetSelectedMailSender,
  actionSetSelectedMailSenderName,
  actionSetSelectedMailSubject
} from './mails';
import { actionGetAllVersionsOfAllEntities } from './legalEntities';
import {
  actionOpenSuccessSnackBar,
  actionOpenErrorSnackBar,
  actionCloseSnackBar
} from './snackbar';

export default {
  actionOpenSuccessSnackBar,
  actionOpenErrorSnackBar,
  actionCloseSnackBar,
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
