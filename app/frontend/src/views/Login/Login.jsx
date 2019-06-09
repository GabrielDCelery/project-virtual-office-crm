import React, { Component } from 'react';
import { UserStoreDecorator } from '../../components';

class Login extends Component {
  render() {
    return (
      <React.Fragment>

      </React.Fragment>
    );
  }
}

const DecoratedComponent = UserStoreDecorator(Login);

export { DecoratedComponent as Login };