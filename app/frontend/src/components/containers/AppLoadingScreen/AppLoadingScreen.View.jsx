import React from 'react';
import { Container, CircularProgress } from '@material-ui/core';

const AppLoadingScreenView = ({ StyledGlobalProgressContainer }) => {
  return (
    <Container maxWidth={false}>
      <StyledGlobalProgressContainer>
        <CircularProgress disableShrink size={150} />
      </StyledGlobalProgressContainer>
    </Container>
  );
};

export default AppLoadingScreenView;
