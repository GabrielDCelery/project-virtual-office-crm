import React from 'react';

export default ToWrapComponent => {
  let MailsListBehaviour = props => {
    return <ToWrapComponent {...props} />;
  };

  return MailsListBehaviour;
};
