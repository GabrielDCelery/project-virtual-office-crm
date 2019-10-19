import React from 'react';
import {
  CssBaseline,
  Container,
  Button,
  Card,
  CardContent,
  TextField
} from '@material-ui/core';

export default ({
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
            <form onSubmit={handleLogin}>
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
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Login
                </Button>
              </CardContent>
            </form>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
