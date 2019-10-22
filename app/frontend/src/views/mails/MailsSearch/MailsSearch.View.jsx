import React from 'react';
import { Container, Paper } from '@material-ui/core';
import { CustomAppBar } from 'components';

const MailsSearchView = () => {
  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <CustomAppBar label="Search Mails" />
        <Paper>dwd</Paper>
      </Container>
    </React.Fragment>
  );
};

export default MailsSearchView;
