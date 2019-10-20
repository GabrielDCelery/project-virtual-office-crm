import React, { useState, useCallback } from 'react';
import { UserStoreDecorator, WithRouterDecorator } from 'components';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actionLogin, history, PATH_TO_DASHBOARD } = props;

    const redirectToDashboard = useCallback(() => {
      return history.push(PATH_TO_DASHBOARD);
    }, [history, PATH_TO_DASHBOARD]);

    return (
      <ToWrapComponent
        {...props}
        {...{
          email: email,
          password: password,
          handleEmailChange: event => setEmail(event.target.value),
          handlePasswordChange: event => setPassword(event.target.value),
          handleLogin: event => {
            event.preventDefault();
            actionLogin({ email, password }, () => {
              return redirectToDashboard();
            });
          }
        }}
      />
    );
  };

  WrapperComponent = UserStoreDecorator(WrapperComponent);
  WrapperComponent = WithRouterDecorator(WrapperComponent);

  return WrapperComponent;
};
