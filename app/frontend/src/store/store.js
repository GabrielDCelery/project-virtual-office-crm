import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
const combinedReducers = combineReducers({
  user: user.reducer
});

const combinedDefaultState = {
  user: user.defaultState
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
