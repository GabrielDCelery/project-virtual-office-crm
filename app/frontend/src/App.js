import React from 'react';
import { Route/*, Redirect, Switch */ } from 'react-router-dom';
import {
  ThemeDecorator,
  StoreDecorator,
  RouterDecorator
} from 'components';
import {
  Login,
  Dashboard
} from 'views';
import config from 'config';

const App = () => {
  return (
    <React.Fragment>
      <Route exact path={config.paths.main} component={Dashboard} />
      <Route exact path={config.paths.login} component={Login} />
    </React.Fragment>
  );
}

export default RouterDecorator(StoreDecorator(ThemeDecorator(App)));
