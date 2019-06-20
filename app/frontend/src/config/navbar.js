import {
  PATH_TO_DASHBOARD,
  PATH_TO_SEARCH_CONTRACTS,
  PATH_TO_SEARCH_MAILS,
  PATH_TO_SEARCH_INSPECTIONS,
  PATH_TO_SEARCH_INVOICES,
  PATH_TO_USER_SETTINGS,
  PATH_TO_LOGOUT,
  STATIC_RBAC_RULE_DASHBOARD_PAGE_VISIT,
  STATIC_RBAC_RULE_CONTRACTS_PAGE_VISIT,
  STATIC_RBAC_RULE_MAILS_PAGE_VISIT,
  STATIC_RBAC_RULE_INSPECTIONS_PAGE_VISIT,
  STATIC_RBAC_RULE_INVOICES_PAGE_VISIT
} from 'consts';

export default [{
  path: PATH_TO_DASHBOARD,
  component: 'Dashboard',
  icon: 'tachometer-alt',
  label: 'Dashboard',
  rbacRule: STATIC_RBAC_RULE_DASHBOARD_PAGE_VISIT
}, {
  path: null,
  component: 'Search',
  icon: 'search',
  label: 'Search',
  children: [{
    label: 'Contracts',
    path: PATH_TO_SEARCH_CONTRACTS,
    component: 'Contracts',
    rbacRule: STATIC_RBAC_RULE_CONTRACTS_PAGE_VISIT
  }, {
    label: 'Mails',
    path: PATH_TO_SEARCH_MAILS,
    rbacRule: STATIC_RBAC_RULE_MAILS_PAGE_VISIT
  }, {
    label: 'Inspections',
    path: PATH_TO_SEARCH_INSPECTIONS,
    rbacRule: STATIC_RBAC_RULE_INSPECTIONS_PAGE_VISIT
  }, {
    label: 'Invoices',
    path: PATH_TO_SEARCH_INVOICES,
    rbacRule: STATIC_RBAC_RULE_INVOICES_PAGE_VISIT
  }]
}, {
  path: null,
  component: null,
  icon: 'user-circle',
  label: 'User',
  rbacRule: null,
  children: [{
    label: 'Settings',
    path: PATH_TO_USER_SETTINGS,
    component: 'Settings',
    rbacRule: null
  }, {
    label: 'Logout',
    path: PATH_TO_LOGOUT,
    rbacRule: null
  }]
}]