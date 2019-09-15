import { selectorGetCityRecommendations } from './cities';
import { selectorGetCountryRecommendations } from './countries';
import { selectorGetLegalEntityRecommendations } from './legalEntities';
import { selectorGetMailSenderNameRecommendations } from './mailSenderNames';
import { selectorGetMailSenderRecommendations } from './mailSenders';
import { selectorGetMailSubjectRecommendations } from './mailSubjects';
import { selectorIsUserAuthenticated, selectorIsUserAuthorized } from './user';

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
    getMailSenderNameRecommendations: selectorGetMailSenderNameRecommendations,
    getMailSubjectRecommendations: selectorGetMailSubjectRecommendations
  },
  countries: {
    getCountryRecommendations: selectorGetCountryRecommendations
  },
  cities: {
    getCityRecommendations: selectorGetCityRecommendations
  }
};
