import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

const SnackBarsView = ({
  StyledSnackbarContent,
  actionCloseSnackBar,
  stateSnackBarMessage,
  stateSnackBarOpen
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={stateSnackBarOpen}
      autoHideDuration={6000}
      onClose={actionCloseSnackBar}
    >
      <StyledSnackbarContent
        aria-describedby="client-snackbar"
        message={stateSnackBarMessage}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={actionCloseSnackBar}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

export default SnackBarsView;
