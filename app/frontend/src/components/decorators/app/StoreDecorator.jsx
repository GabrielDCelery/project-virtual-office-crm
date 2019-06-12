import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'store';

export const StoreDecorator = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <Provider store={store.store}>
          <WrappedComponent {...this.props} />
        </Provider>
      )
    }
  }
}