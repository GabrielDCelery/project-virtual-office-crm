import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004792'
    },
    secondary: {
      main: '#9e6a5a'
    }
  }
});

export const ThemeDecorator = ToWrapComponent => {
  return props => (
    <ThemeProvider theme={theme}>
      <ToWrapComponent {...props} />
    </ThemeProvider>
  );
}