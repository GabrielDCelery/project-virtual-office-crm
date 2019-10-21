import { actionFindAllCities, actionSetSelectedCity } from './cities';
import { actionFindAllCountries, actionSetSelectedCountry } from './countries';
import {
  actionCreateNewMail,
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
import {
  actionLogin,
  actionLogout,
  actionAuthenticateUserByCookie,
  actionSetUserLoginFormField
} from './user';

export default {
  actionLogin,
  actionLogout,
  actionAuthenticateUserByCookie,
  actionCloseSnackBar,
  actionCreateNewMail,
  actionCreateNewMailSenderNameAndReFetch,
  actionCreateNewMailSubjectAndReFetch,
  actionFindAllCities,
  actionFindAllCountries,
  actionFindAllMailSenderNames,
  actionFindAllMailSenders,
  actionFindAllMailSubjects,
  actionOpenErrorSnackBar,
  actionOpenSuccessSnackBar,
  actionSetSelectedCity,
  actionSetSelectedCountry,
  actionSetSelectedMailSender,
  actionSetSelectedMailSenderName,
  actionSetSelectedMailSubject,
  actionSetUserLoginFormField,
  legalEntities: {
    getAllVersionsOfAllEntities: actionGetAllVersionsOfAllEntities
  }
};
