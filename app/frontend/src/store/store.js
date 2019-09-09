import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import default_state from './default_state';
import { mailsReducer } from './mails';
import { userReducer } from './user';
import { legalEntitiesReducer } from './legalEntities';

const combinedReducers = combineReducers({
  addresses: reducers.addresses,
  app: reducers.app,
  legalEntities: legalEntitiesReducer,
  mails: mailsReducer,
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
