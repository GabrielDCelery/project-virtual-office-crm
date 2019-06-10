import React, { Component } from 'react';
import { LoginContainer } from './LoginContainer';
import {
  CssBaseline,
  Container,
  Button,
  Card,
  CardContent,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import useStyles from './useStyles';

class LoginView extends Component {
  render() {
    const {
      classes,
      email,
      password,
      handleFieldValueChangeWrapper,
      handleLogin
    } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Container maxWidth="sm" className={classes.container}>
            <Card raised className={classes.card}>
              <CardContent>
                <TextField
                  id="email"
                  type="email"
                  required
                  fullWidth
                  label="Email"
                  margin="normal"
                  onChange={handleFieldValueChangeWrapper('email')}
                  value={email}
                />
                <TextField
                  id="password"
                  type="password"
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  onChange={handleFieldValueChangeWrapper('password')}
                  value={password}
                />
              </CardContent>
              <CardContent>
                <Button
                  fullWidth
                  type='submit'
                  color="secondary"
                  variant="contained"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

let DecoratedComponent = LoginView;
DecoratedComponent = withStyles(useStyles)(DecoratedComponent);
DecoratedComponent = LoginContainer(DecoratedComponent);

export { DecoratedComponent as LoginView };