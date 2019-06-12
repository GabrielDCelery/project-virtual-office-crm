import React from 'react';
import {
  CssBaseline,
  Container,
  Button,
  Card,
  CardContent,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const LoginView = ({
  classes,
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleLogin
}) => {
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
                onChange={handleEmailChange}
                value={email}
              />
              <TextField
                id="password"
                type="password"
                required
                fullWidth
                label="Password"
                margin="normal"
                onChange={handlePasswordChange}
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

export default withStyles(styles)(LoginView);