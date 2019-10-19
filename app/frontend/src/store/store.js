import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import default_state from './default_state';
import { userReducer } from './user';
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

const combinedReducers = combineReducers({
  cities: citiesReducer,
  countries: countriesReducer,
  app: reducers.app,
  legalEntities: legalEntitiesReducer,
  mails: combineReducers({
    createForm: mailCreateFormReducer,
    senders: mailSendersReducer,
    senderNames: mailSenderNamesReducer,
    subjects: mailSubjectsReducer
  }),
  snackbar: snackbarReducer,
  user: userReducer
});

const combinedDefaultState = {
  user: default_state.user
};

//const loggerMiddleware = createLogger();

const store = createStore(
  combinedReducers,
  combinedDefaultState,
  applyMiddleware(thunkMiddleware /*,
    loggerMiddleware*/)
);

export default store;
