import { combineReducers } from 'redux';
import { mailSendersReducer } from '../mailSenders';
import { mailSenderNamesReducer } from '../mailSenderNames';

export const mailsReducer = combineReducers({
  senders: mailSendersReducer,
  senderNames: mailSenderNamesReducer
});
