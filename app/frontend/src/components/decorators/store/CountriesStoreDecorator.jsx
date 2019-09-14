import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const mapStateToProps = state => {
  return {
    stateIsFetchingCountries: state.countries.isFetching,
    stateCountryRecommendations: store.selectors.countries.getCountryRecommendations(
      state
    )
  };
};

const mapActionsToProps = {
  actionFindAllCountries: store.actions.countries.findAll
};

export const CountriesStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
