import React from 'react';
import { Route/*, Redirect, Switch */ } from 'react-router-dom';
import {
  ThemeDecorator,
  StoreDecorator,
  RouterDecorator,
  AuthenticatedRoute
} from 'components';
import {
  Login,
  Dashboard
} from 'views';
import config from 'config';

const views = {
  Login,
  Dashboard
};

const ViewWithNavbar = ToWrapComponent => {
  return props => (
    <React.Fragment>
      <ToWrapComponent {...props} />
    </React.Fragment>
  );
}

let App = () => {
  return (
    <React.Fragment>
      {config.routes.map(({ path, component, redirectTo, bHasNavbar, bNeedsAuthentication }, index) => (
        <React.Fragment key={`route-${index}`}>
          {bNeedsAuthentication ?
            <AuthenticatedRoute
              exact={true}
              path={path}
              ComponentToRender={bHasNavbar ? ViewWithNavbar(views[component]) : views[component]}
              redirectTo={redirectTo}
            />
            :
            <Route
              exact={true}
              path={path}
              component={bHasNavbar ? ViewWithNavbar(views[component]) : views[component]}
            />
          }
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

App = ThemeDecorator(App);
App = StoreDecorator(App);
App = RouterDecorator(App);

export default App;
