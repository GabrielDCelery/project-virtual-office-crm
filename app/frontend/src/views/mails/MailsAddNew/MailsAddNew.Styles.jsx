import React from 'react';
import styled from 'styled-components';
import { FormControl } from '@material-ui/core';

const StyledFormControl = styled(FormControl)`
  width: 100%;
  .MuiFormControl-root {
    margin-top: 1em;
    margin-bottom: 1em;
  }
`;

export default ToWrapComponent => {
  let WrapperComponent = props => {
    return <ToWrapComponent {...props} {...{ StyledFormControl }} />;
  };

  return WrapperComponent;
};
