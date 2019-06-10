import React from 'react';
import { Route/*, Redirect, Switch */} from 'react-router-dom';
import {
  ThemeDecorator,
  StoreDecorator,
  RouterDecorator
} from './components';
import {
  LoginView
} from './views';

function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={LoginView} />
    </React.Fragment>
  );
}

export default RouterDecorator(StoreDecorator(ThemeDecorator(App)));
