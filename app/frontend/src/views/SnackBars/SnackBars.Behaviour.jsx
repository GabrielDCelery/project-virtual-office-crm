import React from 'react';
import { SnackBarStoreDecorator } from 'components';

export default ToWrapComponent => {
  let SnackBarsBehaviour = props => {
    return <ToWrapComponent {...props} />;
  };

  SnackBarsBehaviour = SnackBarStoreDecorator(SnackBarsBehaviour);

  return SnackBarsBehaviour;
};
