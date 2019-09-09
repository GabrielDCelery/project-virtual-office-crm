import { combineReducers } from 'redux';
import { mailSendersReducer } from '../mailSenders';

export const mailsReducer = combineReducers({
  senders: mailSendersReducer
});
