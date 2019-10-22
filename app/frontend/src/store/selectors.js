import { selectorGetCityRecommendations } from './cities';
import { selectorGetCountryRecommendations } from './countries';
import { selectorGetLegalEntityRecommendations } from './legalEntities';
import {
  selectorGetMailSenderNameRecommendations,
  selectorGetMailSenderRecommendations,
  selectorGetMailSubjectRecommendations,
  selectorAddNewMailFormFieldFactory
} from './mails';
import {
  selectorIsUserAuthenticated,
  selectorIsUserAuthorized,
  selectorUserLoginFormFieldFactory
} from './user';

export default {
  selectorAddNewMailFormFieldFactory,
  selectorGetCityRecommendations,
  selectorGetCountryRecommendations,
  selectorGetMailSenderNameRecommendations,
  selectorGetMailSenderRecommendations,
  selectorGetMailSubjectRecommendations,
  selectorIsUserAuthenticated,
  selectorIsUserAuthorized,
  selectorUserLoginFormFieldFactory,
  legalEntities: {
    getLegalEntityRecommendations: selectorGetLegalEntityRecommendations
  }
};
