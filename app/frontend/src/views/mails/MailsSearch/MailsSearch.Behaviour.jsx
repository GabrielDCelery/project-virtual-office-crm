import React from 'react';

export default ToWrapComponent => {
  let MailsSearchBehaviour = props => {
    return <ToWrapComponent {...props} />;
  };

  return MailsSearchBehaviour;
};
