import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import default_state from './default_state';

const combinedReducers = combineReducers({
  user: reducers.user,
  app: reducers.app,
  addresses: reducers.addresses
});

const combinedDefaultState = {
  user: default_state.user
};

//const loggerMiddleware = createLogger();

const store = createStore(
  combinedReducers,
  combinedDefaultState,
  applyMiddleware(
    thunkMiddleware/*,
    loggerMiddleware*/
  )
);

export default store;
