import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { countriesReducer } from './countries';
import { citiesReducer } from './cities';
import { legalEntitiesReducer } from './legalEntities';
import {
  mailSenderNamesReducer,
  mailSendersReducer,
  mailSubjectsReducer,
  mailCreateFormReducer
} from './mails';
import { snackbarReducer } from './snackbar';
import { userDataReducer, userLoginFormReducer } from './user';
import { appReducer } from './app';

const combinedReducers = combineReducers({
  app: appReducer,
  cities: citiesReducer,
  countries: countriesReducer,
  legalEntities: legalEntitiesReducer,
  mails: combineReducers({
    createForm: mailCreateFormReducer,
    senders: mailSendersReducer,
    senderNames: mailSenderNamesReducer,
    subjects: mailSubjectsReducer
  }),
  snackbar: snackbarReducer,
  user: combineReducers({
    data: userDataReducer,
    login: userLoginFormReducer
  })
});

const combinedDefaultState = {};

//const loggerMiddleware = createLogger();

const store = createStore(
  combinedReducers,
  combinedDefaultState,
  applyMiddleware(thunkMiddleware /*,
    loggerMiddleware*/)
);

export default store;
