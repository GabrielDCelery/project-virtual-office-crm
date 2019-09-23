import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const {
  selectors: { selectorGetCityRecommendations },
  actions: { actionFindAllCities, actionSetSelectedCity }
} = store;

const mapStateToProps = state => {
  return {
    stateIsCitiesAjaxRequestInProgress: state.cities.isAjaxRequestInProgress,
    stateCityRecommendations: selectorGetCityRecommendations(state),
    stateSelectedCity: state.cities.selectedValue
  };
};

const mapActionsToProps = {
  actionFindAllCities,
  actionSetSelectedCity
};

export const CitiesStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
