import React from 'react';

export default ToWrapComponent => {
  let MailsSearchStyles = props => {
    return <ToWrapComponent {...props} />;
  };

  return MailsSearchStyles;
};
