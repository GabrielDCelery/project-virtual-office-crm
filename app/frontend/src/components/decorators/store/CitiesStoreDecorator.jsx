import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const mapStateToProps = state => {
  return {
    stateIsFetchingCities: state.cities.isFetching,
    stateCityRecommendations: store.selectors.cities.getCityRecommendations(
      state
    )
  };
};

const mapActionsToProps = {
  actionFindAllCities: store.actions.cities.findAll
};

export const CitiesStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
