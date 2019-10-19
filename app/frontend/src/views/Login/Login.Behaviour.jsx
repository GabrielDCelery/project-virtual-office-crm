import React, { useState } from 'react';
import { UserStoreDecorator, WithRouterDecorator } from 'components';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { history, PATH_TO_DASHBOARD } = props;
    /*
    useEffect(() => {
      if (stateIsUserAuthenticated) {
        return history.push(location.state.from);
      }
      (async () => {
        await actionAuthenticateUserByCookie();
      })();
    }, [
      actionAuthenticateUserByCookie,
      stateIsUserAuthenticated,
      history,
      location.state.from
    ]);
*/
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
            history.push(PATH_TO_DASHBOARD);
            /*
            actionLogin({ email, password }, () =>
              history.push(PATH_TO_DASHBOARD)
            );
            */
          }
        }}
      />
    );
  };

  WrapperComponent = UserStoreDecorator(WrapperComponent);
  WrapperComponent = WithRouterDecorator(WrapperComponent);

  return WrapperComponent;
};
