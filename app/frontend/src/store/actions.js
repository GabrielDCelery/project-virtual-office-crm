import { actionFindAllCities } from './cities';
import { actionFindAllCountries } from './countries';
import {
  actionSubmitAddNewMailForm,
  actionCreateNewMailSenderNameAndReFetch,
  actionCreateNewMailSubjectAndReFetch,
  actionFindAllMailSenderNames,
  actionFindAllMailSenders,
  actionFindAllMailSubjects,
  actionSetAddNewMailFormField,
  actionFindAllMailsPendingActionsNotifyEmails,
  actionPendingActionsSendEmailNotifications
} from './mails';
import { actionGetLatestVersionsOfAllEntities } from './legalEntities';
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
  actionAuthenticateUserByCookie,
  actionCloseSnackBar,
  actionCreateNewMailSenderNameAndReFetch,
  actionCreateNewMailSubjectAndReFetch,
  actionFindAllCities,
  actionFindAllCountries,
  actionFindAllMailSenderNames,
  actionFindAllMailSenders,
  actionFindAllMailSubjects,
  actionLogin,
  actionLogout,
  actionOpenErrorSnackBar,
  actionOpenSuccessSnackBar,
  actionSetAddNewMailFormField,
  actionSetUserLoginFormField,
  actionSubmitAddNewMailForm,
  actionFindAllMailsPendingActionsNotifyEmails,
  actionPendingActionsSendEmailNotifications,
  actionGetLatestVersionsOfAllEntities
};
