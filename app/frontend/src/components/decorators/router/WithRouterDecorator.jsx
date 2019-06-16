import React from 'react';
import { withRouter } from 'react-router';
import config from 'config';

export const WithRouterDecorator = ToWrapComponent => {
  return withRouter(props => {
    return (
      <ToWrapComponent
        {...props}
        {...{
          PATH_TO_LOGIN: config.paths.login,
          PATH_TO_LOGOUT: config.paths.logout,
          PATH_TO_DASHBOARD: config.paths.dashboard
        }}
      />
    )
  });
}