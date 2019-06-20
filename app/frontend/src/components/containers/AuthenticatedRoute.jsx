import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  UserStoreDecorator
} from 'components';

let AuthenticatedRoute = props => {
  const {
    stateIsUserLoggedIn,
    exact,
    path,
    ComponentToRender,
    redirectTo
  } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        stateIsUserLoggedIn ? <ComponentToRender /> : <Redirect to={redirectTo} />
      )}
    />
  );
}

AuthenticatedRoute = UserStoreDecorator(AuthenticatedRoute);

export { AuthenticatedRoute };