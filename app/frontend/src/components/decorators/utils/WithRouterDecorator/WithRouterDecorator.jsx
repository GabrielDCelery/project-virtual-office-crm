import React, { Component } from 'react';
import { withRouter } from 'react-router';

export const WithRouterDecorator = WrappedComponent => {
  class RouterHistoryComponent extends Component {
    constructor(props) {
      super(props);
      this._handleNav = this._handleNav.bind(this);
      this.handleNavToMainPage = this.handleNavToMainPage.bind(this);
    }

    _handleNav(goTo) {
      const { history } = this.props;

      return history.push(goTo);
    }

    handleNavToMainPage() {
      return this._handleNav('/');
    }

    render() {
      const {
        handleNavToMainPage
      } = this.props;

      return (
        <WrappedComponent
          {...this.props}
          {...{
            handleNavToMainPage
          }}
        />
      )
    }
  }


  return withRouter(RouterHistoryComponent);
}