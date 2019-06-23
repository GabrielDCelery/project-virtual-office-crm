import React from 'react';
import {
  CssBaseline,
  Container,
  Button,
  Card,
  CardContent,
  TextField
} from '@material-ui/core';
import {
  BootstrapStyleAlert
} from 'components';

const ErrorMessages = ({ messages }) => {
  return (
    messages.length > 0 ?
      <CardContent>
        {messages.map((message, index) => (
          <BootstrapStyleAlert
            key={`login-error-${index}`}
            alertType="danger"
            message={message}
          />
        ))}
      </CardContent>
      : null
  )
}

export default ({
  classes,
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleLogin,
  stateLoginErrorMessages
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
              <ErrorMessages messages={stateLoginErrorMessages} />
              <CardContent>
                <Button
                  fullWidth
                  type='submit'
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
}