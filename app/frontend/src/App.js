import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {
  ThemeDecorator,
  StoreDecorator
} from './components';
import {
  Login
} from './views';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Login} />
    </Router>
  );
}

export default StoreDecorator(ThemeDecorator(App));
