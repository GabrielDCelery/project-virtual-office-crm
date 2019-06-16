import React from 'react';
import { Route/*, Redirect, Switch */ } from 'react-router-dom';
import {
  ThemeDecorator,
  StoreDecorator,
  RouterDecorator,
  WithRouterDecorator
} from 'components';
import {
  Login,
  Dashboard
} from 'views';

let App = ({ PATH_TO_MAIN, PATH_TO_LOGIN }) => {
  return (
    <React.Fragment>
      <Route exact path={PATH_TO_MAIN} component={Dashboard} />
      <Route exact path={PATH_TO_LOGIN} component={Login} />
    </React.Fragment>
  );
}

App = ThemeDecorator(App);
App = StoreDecorator(App);
App = WithRouterDecorator(App);
App = RouterDecorator(App);

export default App;
