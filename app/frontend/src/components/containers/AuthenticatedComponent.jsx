import React from 'react';
import {
  UserStoreDecorator
} from 'components';

export const AuthenticatedComponent = ToWrapComponent => {
  const WrapperComponent = props => {
    const { stateIsUserLoggedIn } = props;

    return stateIsUserLoggedIn ? <ToWrapComponent {...props} /> : null;
  };

  return UserStoreDecorator(WrapperComponent);
}