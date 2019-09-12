import React, { useEffect, useState } from 'react';
import { LegalEntitiesStoreDecorator, MailsStoreDecorator } from 'components';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    const {
      actionFindAllMailSenders,
      actionGetAllVersionsOfAllEntities
    } = props;

    const [mailReceiver, setMailReceiver] = useState(null);
    const [mailSender, setMailSender] = useState(null);
    const [mailSenderActivePanel, setMailSenderActivePanel] = useState(0);

    const handleSetMailSenderActivePanel = (event, newValue) => {
      setMailSender(null);
      setMailSenderActivePanel(newValue);
    };

    useEffect(() => {
      (async () => {
        await actionFindAllMailSenders();
        await actionGetAllVersionsOfAllEntities();
      })();
    }, [actionFindAllMailSenders, actionGetAllVersionsOfAllEntities]);

    return (
      <ToWrapComponent
        {...props}
        {...{
          handleSetMailSenderActivePanel,
          mailReceiver,
          mailSender,
          mailSenderActivePanel,
          setMailReceiver,
          setMailSender
        }}
      />
    );
  };

  WrapperComponent = LegalEntitiesStoreDecorator(WrapperComponent);
  WrapperComponent = MailsStoreDecorator(WrapperComponent);

  return WrapperComponent;
};
