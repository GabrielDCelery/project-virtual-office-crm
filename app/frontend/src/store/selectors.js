import { selectorGetCityRecommendations } from './cities';
import { selectorGetCountryRecommendations } from './countries';
import { selectorGetLegalEntityRecommendations } from './legalEntities';
import { selectorGetMailSenderNameRecommendations } from './mailSenderNames';
import { selectorGetMailSenderRecommendations } from './mailSenders';
import { selectorGetMailSubjectRecommendations } from './mailSubjects';
import { selectorIsUserAuthenticated, selectorIsUserAuthorized } from './user';

export default {
  selectorGetMailSenderNameRecommendations,
  selectorGetMailSenderRecommendations,
  selectorGetMailSubjectRecommendations,
  selectorGetCountryRecommendations,
  user: {
    isUserAuthenticated: selectorIsUserAuthenticated,
    isUserAuthorized: selectorIsUserAuthorized
  },
  legalEntities: {
    getLegalEntityRecommendations: selectorGetLegalEntityRecommendations
  },
  cities: {
    getCityRecommendations: selectorGetCityRecommendations
  }
};
