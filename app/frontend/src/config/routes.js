import {
  PATH_TO_ADD_NEW_CONTRACT,
  PATH_TO_ADD_NEW_MAIL,
  PATH_TO_LOGIN,
  PATH_TO_DASHBOARD,
  PATH_TO_SEARCH_CONTRACTS,
  PATH_TO_SEARCH_MAILS,
  PATH_TO_SEARCH_INSPECTIONS,
  PATH_TO_SEARCH_INVOICES /*,
  PATH_TO_USER_SETTINGS*/,
  PATH_TO_DATABASE_ADDRESSES
} from 'consts';

export default [
  {
    bHasNavbar: false,
    bNeedsAuthentication: false,
    path: PATH_TO_LOGIN,
    component: 'Login'
  },
  {
    bHasNavbar: true,
    bNeedsAuthentication: true,
    path: PATH_TO_DASHBOARD,
    component: 'Dashboard',
    redirectTo: PATH_TO_LOGIN
  },
  {
    bHasNavbar: true,
    bNeedsAuthentication: true,
    path: PATH_TO_SEARCH_CONTRACTS,
    component: 'Search',
    redirectTo: PATH_TO_LOGIN
  },
  {
    bHasNavbar: true,
    bNeedsAuthentication: true,
    path: PATH_TO_SEARCH_MAILS,
    component: 'Search',
    redirectTo: PATH_TO_LOGIN
  },
  {
    bHasNavbar: true,
    bNeedsAuthentication: true,
    path: PATH_TO_SEARCH_INSPECTIONS,
    component: 'Search',
    redirectTo: PATH_TO_LOGIN
  },
  {
    bHasNavbar: true,
    bNeedsAuthentication: true,
    path: PATH_TO_SEARCH_INVOICES,
    component: 'Search',
    redirectTo: PATH_TO_LOGIN
  },
  {
    bHasNavbar: true,
    bNeedsAuthentication: true,
    path: PATH_TO_DATABASE_ADDRESSES,
    component: 'Database',
    redirectTo: PATH_TO_LOGIN
  },
  {
    bHasNavbar: true,
    bNeedsAuthentication: true,
    path: PATH_TO_ADD_NEW_CONTRACT,
    component: 'Search',
    redirectTo: PATH_TO_LOGIN
  },
  {
    bHasNavbar: true,
    bNeedsAuthentication: true,
    path: PATH_TO_ADD_NEW_MAIL,
    component: 'MailsAddNew',
    redirectTo: PATH_TO_LOGIN
  }
];
