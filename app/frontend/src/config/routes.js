import {
  PATH_TO_LOGIN,
  PATH_TO_DASHBOARD/*,
  PATH_TO_SEARCH_CONTRACTS,
  PATH_TO_SEARCH_MAILS,
  PATH_TO_SEARCH_INSPECTIONS,
  PATH_TO_SEARCH_INVOICES,
  PATH_TO_USER_SETTINGS*/
} from 'consts';

export default [{
  bHasNavbar: false,
  bNeedsAuthentication: false,
  path: PATH_TO_LOGIN,
  component: 'Login'
}, {
  bHasNavbar: true,
  bNeedsAuthentication: true,
  path: PATH_TO_DASHBOARD,
  component: 'Dashboard',
  redirectTo: PATH_TO_LOGIN
}]