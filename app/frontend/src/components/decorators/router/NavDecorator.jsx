import React, { Component } from 'react';
import { withRouter } from 'react-router';
import config from 'config';

export const NavDecorator = WrappedComponent => {
  class DecoratorComponent extends Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...{
            PATH_TO_LOGIN: config.paths.login,
            PATH_TO_LOGOUT: config.paths.logout,
            PATH_TO_MAIN: config.paths.main
          }}
        />
      )
    }
  }

  return withRouter(DecoratorComponent);
}
