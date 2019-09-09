import React from 'react';
import styled from 'styled-components';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    return <ToWrapComponent {...props} />;
  };

  return WrapperComponent;
};
