import React from 'react';
import { Container, Paper } from '@material-ui/core';
import { CustomAppBar, ActionableDataTable } from 'components';

const MailsSearchView = ({ statePendingActionsNotifyEmails }) => {
  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <CustomAppBar label="Search Mails" />
        <Paper>
          <ActionableDataTable items={statePendingActionsNotifyEmails} />
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default MailsSearchView;
