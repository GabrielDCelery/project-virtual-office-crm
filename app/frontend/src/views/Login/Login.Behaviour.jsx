import React, { useState } from 'react';
import {
  UserStoreDecorator,
  WithRouterDecorator
} from 'components';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actionLogin, history, PATH_TO_DASHBOARD } = props;

    return (
      <ToWrapComponent
        {...props}
        {...{
          email: email,
          password: password,
          handleEmailChange: event => setEmail(event.target.value),
          handlePasswordChange: event => setPassword(event.target.value),
          handleLogin: () => actionLogin({ email, password }, () => history.push(PATH_TO_DASHBOARD))
        }}
      />
    )
  }

  WrapperComponent = UserStoreDecorator(WrapperComponent);
  WrapperComponent = WithRouterDecorator(WrapperComponent);

  return WrapperComponent;
}