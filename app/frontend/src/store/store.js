import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import default_state from './default_state';
import { userReducer } from './user';
import { countriesReducer } from './countries';
import { citiesReducer } from './cities';
import { legalEntitiesReducer } from './legalEntities';
import { mailSendersReducer } from './mailSenders';
import { mailSenderNamesReducer } from './mailSenderNames';
import { mailSubjectsReducer } from './mailSubjects';
import { mailCreateReducer } from './mailCreate';

const combinedReducers = combineReducers({
  addresses: reducers.addresses,
  cities: citiesReducer,
  countries: countriesReducer,
  app: reducers.app,
  legalEntities: legalEntitiesReducer,
  mails: combineReducers({
    create: mailCreateReducer,
    senders: mailSendersReducer,
    senderNames: mailSenderNamesReducer,
    subjects: mailSubjectsReducer
  }),
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
