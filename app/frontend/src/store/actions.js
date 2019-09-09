import { actionFindAllMailSenders } from './mailSenders';
import { actionGetAllVersionsOfAllEntities } from './legalEntities';
import actions_old from './actions_old';

export default {
  addresses: actions_old.addresses,
  user: actions_old.user,
  legalEntities: {
    getAllVersionsOfAllEntities: actionGetAllVersionsOfAllEntities
  },
  mails: {
    findAllMailSenders: actionFindAllMailSenders
  }
};
