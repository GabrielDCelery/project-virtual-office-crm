import React from 'react';
import styled from 'styled-components';
import { SnackbarContent } from '@material-ui/core';

const StyledSnackbarContent = styled(SnackbarContent)`
  font-size: 1.5em !important;
  padding: 1em !important;
  width: 25vw !important;
`;

const SuccessSnackbarContent = styled(StyledSnackbarContent)`
  background-color: #42a047 !important;
`;

const ErrorSnackbarContent = styled(StyledSnackbarContent)`
  background-color: #d42f2f !important;
`;

const SnackbarContentVariants = {
  success: SuccessSnackbarContent,
  error: ErrorSnackbarContent
};

export default ToWrapComponent => {
  let SnackBarsStyles = props => {
    const { stateSnackBarVariant } = props;

    return (
      <ToWrapComponent
        {...props}
        {...{
          StyledSnackbarContent:
            SnackbarContentVariants[stateSnackBarVariant] || SnackbarContent
        }}
      />
    );
  };

  return SnackBarsStyles;
};
