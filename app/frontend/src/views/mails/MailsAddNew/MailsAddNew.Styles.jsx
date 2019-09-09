import React from 'react';
//import { IconButton } from '@material-ui/core';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    return <ToWrapComponent {...props} />;
  };

  return WrapperComponent;
};
