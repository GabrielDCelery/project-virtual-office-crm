import React, { useState } from 'react';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    const [bIsOpen, setIsOpen] = useState(true);

    return (
      <ToWrapComponent
        {...props}
        {...{
          bIsOpen: bIsOpen,
          toggleIsOpen: () => setIsOpen(!bIsOpen)
        }}
      />
    )
  }

  return WrapperComponent;
}