import React from 'react';
import config from 'config';
import {
  WithRouterDecorator
} from 'components';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    const { location } = props;
    const navbarItems = config.navbar.map(({ path, component, icon, label, rbacRule, children }) => {
      const newItem = {
        path,
        component,
        icon,
        label,
        rbacRule,
        bIsActive: path === location.pathname
      };

      if (children) {
        newItem['children'] = children.map(({ path, label, component, rbacRule }) => {
          const newChildItem = {
            path,
            label,
            component,
            rbacRule
          };

          if (path === location.pathname) {
            newItem['bIsActive'] = true;
            newChildItem['bIsActive'] = true;
          }

          return newChildItem;
        });
      }

      return newItem;
    });

    return (
      <ToWrapComponent
        {...props}
        {...{
          navbarItems: navbarItems
        }}
      />
    )
  }

  WrapperComponent = WithRouterDecorator(WrapperComponent);

  return WrapperComponent;
}