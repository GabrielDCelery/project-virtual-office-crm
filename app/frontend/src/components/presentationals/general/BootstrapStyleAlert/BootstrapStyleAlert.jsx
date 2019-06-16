import React from 'react';
import {
  Paper,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import useStyles from './useStyles';

let BootstrapStyleAlert = ({ alertType, message, classes }) => {
  return (
    <React.Fragment>
      <Paper className={`${classes.root} ${classes[alertType]}`}>
        <Typography component='p' className={classes.message}>
          {message}
        </Typography>
      </Paper>
    </React.Fragment>
  );
}

BootstrapStyleAlert = withStyles(useStyles)(BootstrapStyleAlert);

export { BootstrapStyleAlert };
