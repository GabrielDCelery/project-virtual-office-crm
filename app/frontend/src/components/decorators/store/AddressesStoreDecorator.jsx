import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const mapStateToProps = state => {
  return {
    stateAddresses: state.addresses.addresses
  };
};

const mapActionsToProps = {
  actionAddressesFindAll: store.actions.addresses.findAll
};

export const AddressesStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
