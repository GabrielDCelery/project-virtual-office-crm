import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004792'
    },
    secondary: {
      main: '#921f01'
    }
  }
});

export const ThemeDecorator = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <ThemeProvider theme={theme}>
          <WrappedComponent {...this.props} />
        </ThemeProvider>
      )
    }
  }
}