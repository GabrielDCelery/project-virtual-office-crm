import React from 'react';

export default ToWrapComponent => {
  let AppLoadingScreenBehaviour = props => {
    return <ToWrapComponent {...props} />;
  };

  return AppLoadingScreenBehaviour;
};
