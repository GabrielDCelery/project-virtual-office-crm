import { combineReducers } from 'redux';
import { mailSendersReducer } from '../mailSenders';
import { mailSenderNamesReducer } from '../mailSenderNames';
import { mailSubjectsReducer } from '../mailSubjects';

export const mailsReducer = combineReducers({
  senders: mailSendersReducer,
  senderNames: mailSenderNamesReducer,
  subjects: mailSubjectsReducer
});
