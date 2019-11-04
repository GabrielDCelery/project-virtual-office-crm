import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const mapStateToProps = state => {
  return {
    stateIsFetchingLegalEntities: state.legalEntities.isFetching,
    stateLegalEntityRecommendations: store.selectors.legalEntities.getLegalEntityRecommendations(
      state
    )
  };
};

const mapActionsToProps = {
  actionGetAllVersionsOfAllEntities:
    store.actions.legalEntities.getAllVersionsOfAllRecords
};

export const LegalEntitiesStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
