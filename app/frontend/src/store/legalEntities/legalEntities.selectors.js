import _ from 'lodash';
import { createSelector } from 'reselect';

const getLegalEntityAllVersions = state => {
  return _.get(state, ['legalEntities', 'allVersionsOfAllRecords']);
};

export const selectorGetLegalEntityRecommendations = createSelector(
  [getLegalEntityAllVersions],
  legalEntityAllVersions => {
    return legalEntityAllVersions.map(({ legalEntityId, longName, type }) => ({
      value: legalEntityId,
      label: `${longName} ${type}`
    }));
  }
);
