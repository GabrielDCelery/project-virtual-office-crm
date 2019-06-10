import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export const RouterDecorator = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <Router>
          <WrappedComponent {...this.props} />
        </Router>
      )
    }
  }
}