import React from 'react';
import styled from 'styled-components';

const StyledGlobalProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vh;
`;

export default ToWrapComponent => {
  let AppLoadingScreenStyles = props => {
    return (
      <ToWrapComponent
        {...props}
        {...{
          StyledGlobalProgressContainer
        }}
      />
    );
  };

  return AppLoadingScreenStyles;
};
