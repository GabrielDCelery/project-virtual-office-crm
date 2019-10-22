import React from 'react';

export default ToWrapComponent => {
  let MailsListStyles = props => {
    return <ToWrapComponent {...props} />;
  };

  return MailsListStyles;
};
