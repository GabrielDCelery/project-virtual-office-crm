import { selectorIsUserAuthenticated, selectorIsUserAuthorized } from './user';
import { selectorGetLegalEntityRecommendations } from './legalEntities';
import { selectorGetMailSenderRecommendations } from './mailSenders';

export default {
  user: {
    isUserAuthenticated: selectorIsUserAuthenticated,
    isUserAuthorized: selectorIsUserAuthorized
  },
  legalEntities: {
    getLegalEntityRecommendations: selectorGetLegalEntityRecommendations
  },
  mails: {
    getMailSenderRecommendations: selectorGetMailSenderRecommendations
  }
};
