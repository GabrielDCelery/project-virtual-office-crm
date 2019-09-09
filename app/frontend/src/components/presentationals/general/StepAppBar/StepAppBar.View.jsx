import React from 'react';
import { AppBar, Toolbar, Typography, Badge, Tooltip } from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import { ComponentFlexboxCenterPositioner } from '../ComponentFlexboxCenterPositioner';

export default ({ handleStepOpenToggle, isStepOpen, label }) => {
  return (
    <React.Fragment>
      <div style={{ height: '1em' }}></div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography component="h3">
            <strong>{label}</strong>
          </Typography>
          <Typography component="div" style={{ flexGrow: 1 }}></Typography>
          <ComponentFlexboxCenterPositioner
            onClick={handleStepOpenToggle}
            style={{ cursor: 'pointer' }}
          >
            {isStepOpen ? (
              <ExpandLessIcon fontSize="large" />
            ) : (
              <ExpandMoreIcon fontSize="large" />
            )}
          </ComponentFlexboxCenterPositioner>
        </Toolbar>
      </AppBar>
      <div style={{ height: '1em' }}></div>
    </React.Fragment>
  );
};
