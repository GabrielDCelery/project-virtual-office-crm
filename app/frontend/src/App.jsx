import React, { useEffect } from 'react';
import { Route /*, Redirect, Switch */ } from 'react-router-dom';
import {
  AppLoadingScreen,
  AppStoreDecorator,
  UserStoreDecorator,
  AuthenticatedRoute,
  RouterDecorator,
  StoreDecorator,
  ThemeDecorator
} from 'components';
import {
  Dashboard,
  Database,
  Login,
  Logout,
  MailsAddNew,
  MailsSearch,
  NavBar,
  Search,
  SnackBars
} from 'views';
import config from 'config';
import './App.css';

const views = {
  Dashboard,
  Database,
  Login,
  Logout,
  MailsAddNew,
  MailsSearch,
  Search,
  SnackBars
};

const ViewWithNavbar = ToWrapComponent => {
  return props => (
    <div style={{ display: 'flex' }}>
      <NavBar />
      <div style={{ flexGrow: 1 }}>
        <ToWrapComponent {...props} />
      </div>
    </div>
  );
};

const ViewWithoutNavbar = ToWrapComponent => {
  return props => (
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1 }}>
        <ToWrapComponent {...props} />
      </div>
    </div>
  );
};

let App = ({ actionAuthenticateUserByCookie, stateIsAppLoadingScreenOn }) => {
  useEffect(() => {
    (async () => {
      await actionAuthenticateUserByCookie();
    })();
  }, [actionAuthenticateUserByCookie]);

  return (
    <React.Fragment>
      {stateIsAppLoadingScreenOn ? (
        <AppLoadingScreen />
      ) : (
        <React.Fragment>
          {config.routes.map(
            (
              { path, component, redirectTo, bHasNavbar, bNeedsAuthentication },
              index
            ) => (
              <React.Fragment key={`route-${index}`}>
                {bNeedsAuthentication ? (
                  <AuthenticatedRoute
                    exact={true}
                    path={path}
                    ComponentToRender={
                      bHasNavbar
                        ? ViewWithNavbar(views[component])
                        : ViewWithoutNavbar(views[component])
                    }
                    redirectTo={redirectTo}
                  />
                ) : (
                  <Route
                    exact={true}
                    path={path}
                    component={
                      bHasNavbar
                        ? ViewWithNavbar(views[component])
                        : ViewWithoutNavbar(views[component])
                    }
                  />
                )}
              </React.Fragment>
            )
          )}
        </React.Fragment>
      )}

      <SnackBars />
    </React.Fragment>
  );
};

App = UserStoreDecorator(App);
App = AppStoreDecorator(App);
App = ThemeDecorator(App);
App = StoreDecorator(App);
App = RouterDecorator(App);

export default App;
