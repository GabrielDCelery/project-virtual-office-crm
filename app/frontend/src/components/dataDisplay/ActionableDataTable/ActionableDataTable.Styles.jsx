import React from 'react';

export default ToWrapComponent => {
  let ActionableDataTableStyles = props => {
    return <ToWrapComponent {...props} />;
  };

  return ActionableDataTableStyles;
};
