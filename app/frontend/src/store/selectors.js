import { selectorIsUserAuthenticated, selectorIsUserAuthorized } from './user';
import { selectorGetLegalEntityRecommendations } from './legalEntities';
import { selectorGetMailSenderRecommendations } from './mailSenders';
import { selectorGetMailSenderNameRecommendations } from './mailSenderNames';
import { selectorGetCountryRecommendations } from './countries';
import { selectorGetCityRecommendations } from './cities';

export default {
  user: {
    isUserAuthenticated: selectorIsUserAuthenticated,
    isUserAuthorized: selectorIsUserAuthorized
  },
  legalEntities: {
    getLegalEntityRecommendations: selectorGetLegalEntityRecommendations
  },
  mails: {
    getMailSenderRecommendations: selectorGetMailSenderRecommendations,
    getMailSenderNameRecommendations: selectorGetMailSenderNameRecommendations
  },
  countries: {
    getCountryRecommendations: selectorGetCountryRecommendations
  },
  cities: {
    getCityRecommendations: selectorGetCityRecommendations
  }
};
