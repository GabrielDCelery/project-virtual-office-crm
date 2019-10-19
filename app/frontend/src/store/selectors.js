import { selectorGetCityRecommendations } from './cities';
import { selectorGetCountryRecommendations } from './countries';
import { selectorGetLegalEntityRecommendations } from './legalEntities';
import {
  selectorGetMailSenderNameRecommendations,
  selectorGetMailSenderRecommendations,
  selectorGetMailSubjectRecommendations
} from './mails';
import { selectorIsUserAuthenticated, selectorIsUserAuthorized } from './user';

export default {
  selectorGetMailSenderNameRecommendations,
  selectorGetMailSenderRecommendations,
  selectorGetMailSubjectRecommendations,
  selectorGetCountryRecommendations,
  selectorGetCityRecommendations,
  selectorIsUserAuthenticated,
  selectorIsUserAuthorized,
  legalEntities: {
    getLegalEntityRecommendations: selectorGetLegalEntityRecommendations
  }
};
