import React, { Component } from 'react';
import {
  UserStoreDecorator,
  NavDecorator
} from 'components';

export default WrappedComponent => {
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
      const { actionLogin, history, PATH_TO_MAIN } = this.props;
      const { email, password } = this.state;

      return actionLogin({ email, password }, () => {
        return history.push(PATH_TO_MAIN);
      });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...{
            email: this.state.email,
            password: this.state.password,
            handleEmailChange: this.handleFieldValueChangeWrapper('email'),
            handlePasswordChange: this.handleFieldValueChangeWrapper('password'),
            handleFieldValueChangeWrapper: this.handleFieldValueChangeWrapper,
            handleLogin: this.handleLogin
          }}
        />
      )
    }
  }

  return NavDecorator(UserStoreDecorator(ContainerComponent));
}