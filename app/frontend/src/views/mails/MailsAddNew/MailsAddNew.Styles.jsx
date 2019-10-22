import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

const StyledContainer = styled(Container)`
  &.MuiContainer-root {
    margin-left: 0;
  }
`;

export default ToWrapComponent => {
  let WrapperComponent = props => {
    return <ToWrapComponent {...props} {...{ StyledContainer }} />;
  };

  return WrapperComponent;
};
