import React, { useEffect } from 'react';
import { LegalEntitiesStoreDecorator, MailsStoreDecorator } from 'components';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    const {
      actionFindAllMailSenders,
      actionGetAllVersionsOfAllEntities
    } = props;

    useEffect(() => {
      (async () => {
        await actionFindAllMailSenders();
        await actionGetAllVersionsOfAllEntities();
      })();
    }, [actionFindAllMailSenders, actionGetAllVersionsOfAllEntities]);

    return <ToWrapComponent {...props} />;
  };

  WrapperComponent = LegalEntitiesStoreDecorator(WrapperComponent);
  WrapperComponent = MailsStoreDecorator(WrapperComponent);

  return WrapperComponent;
};
