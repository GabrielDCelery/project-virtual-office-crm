import React, { useEffect } from 'react';
import {
  AddressesStoreDecorator
} from 'components';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    const {
      actionAddressesFindAll,
      stateAddresses
    } = props;

    useEffect(() => {
      actionAddressesFindAll();

      return () => { }
    }, [
        actionAddressesFindAll
      ]);

    return (
      <ToWrapComponent
        {...props}
        {...{
          stateAddresses
        }}
      />
    )
  }

  WrapperComponent = AddressesStoreDecorator(WrapperComponent);

  return WrapperComponent;
}