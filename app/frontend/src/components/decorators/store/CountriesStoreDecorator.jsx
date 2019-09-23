import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const {
  selectors: { selectorGetCountryRecommendations },
  actions: { actionFindAllCountries, actionSetSelectedCountry }
} = store;

const mapStateToProps = state => {
  return {
    stateIsCountriesAjaxRequestInProgress:
      state.countries.isAjaxRequestInProgress,
    stateCountryRecommendations: selectorGetCountryRecommendations(state),
    stateSelectedCountry: state.countries.selectedValue
  };
};

const mapActionsToProps = {
  actionFindAllCountries,
  actionSetSelectedCountry
};

export const CountriesStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
