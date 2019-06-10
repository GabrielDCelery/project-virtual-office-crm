import React, { Component } from 'react';
import {
  UserStoreDecorator,
  WithRouterDecorator
} from '../../components';

export const LoginContainer = WrappedComponent => {
  class ContainerComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        email: '',
        password: ''
      };

      this.handleFieldValueChangeWrapper = this.handleFieldValueChangeWrapper.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
    }

    handleFieldValueChangeWrapper(key) {
      return event => {
        const newState = { ...this.state };
        newState[key] = event.target.value;

        return this.setState(newState);
      }
    }

    handleLogin() {
      const { actionLogin, handleNavToMainPage } = this.props;
      const { email, password } = this.state;

      return actionLogin({ email, password }, handleNavToMainPage);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...{
            email: this.state.email,
            password: this.state.password,
            handleFieldValueChangeWrapper: this.handleFieldValueChangeWrapper,
            handleLogin: this.handleLogin
          }}
        />
      )
    }
  }

  return WithRouterDecorator(UserStoreDecorator(ContainerComponent));
}