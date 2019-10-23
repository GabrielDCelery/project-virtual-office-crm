import React, { useEffect } from 'react';
import { MailsPendingActionsNotifyEmailsStoreDecorator } from 'components';

export default ToWrapComponent => {
  let MailsSearchBehaviour = props => {
    const {
      actionFindAllMailsPendingActionsNotifyEmails,
      statePendingActionsNotifyEmails
    } = props;

    useEffect(() => {
      (async () => {
        await actionFindAllMailsPendingActionsNotifyEmails();
      })();
    }, [actionFindAllMailsPendingActionsNotifyEmails]);

    return (
      <ToWrapComponent {...props} {...{ statePendingActionsNotifyEmails }} />
    );
  };

  MailsSearchBehaviour = MailsPendingActionsNotifyEmailsStoreDecorator(
    MailsSearchBehaviour
  );

  return MailsSearchBehaviour;
};
