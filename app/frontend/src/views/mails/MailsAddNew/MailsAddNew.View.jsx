import React from 'react';
import { Box, Container, Paper, Tab, Tabs, TextField } from '@material-ui/core';
import { ReactSelect, StepAppBar } from 'components';

export default ({
  StyledFormControl,
  handleSetMailSenderActivePanel,
  mailReceiver,
  mailSender,
  mailSenderActivePanel,
  setMailReceiver,
  setMailSender,
  stateIsFetchingLegalEntities,
  stateIsFetchingMailSenders,
  stateLegalEntityRecommendations,
  stateMailSenderRecommendations
}) => {
  return (
    <Container maxWidth="lg">
      <StepAppBar label="Mail Receiver (Legal Entity)" />
      <Paper>
        <Box component="div" p={4}>
          <StyledFormControl>
            <ReactSelect
              inputId="react-select-single"
              isClearable={true}
              isLoading={stateIsFetchingLegalEntities}
              label="Legal Entity"
              options={stateLegalEntityRecommendations}
              onChange={value => {
                setMailReceiver(value);
              }}
              placeholder="Select a legal entity"
              value={mailReceiver}
            />
          </StyledFormControl>
        </Box>
      </Paper>
      <StepAppBar label="Mail Sender" />
      <Paper>
        <Tabs
          aria-label="disabled tabs example"
          indicatorColor="primary"
          onChange={handleSetMailSenderActivePanel}
          textColor="primary"
          value={mailSenderActivePanel}
          style={{ background: '#eee' }}
        >
          <Tab label="Choose Existing Mail Sender" />
          <Tab label="Add New Mail Sender" />
        </Tabs>
        <Box component="div" p={4}>
          {mailSenderActivePanel === 0 ? (
            <ReactSelect
              inputId="react-select-single"
              isClearable={true}
              isLoading={stateIsFetchingMailSenders}
              label="Mail Sender"
              options={stateMailSenderRecommendations}
              onChange={value => {
                setMailSender(value);
              }}
              placeholder="Select a mail sender"
              value={mailSender}
            />
          ) : null}
          {mailSenderActivePanel === 1 ? (
            <React.Fragment>
              <StyledFormControl>
                <ReactSelect
                  inputId="react-select-single"
                  isClearable={true}
                  onChange={value => {}}
                  options={stateLegalEntityRecommendations}
                  label="Mail Sender"
                  placeholder="Select or create Mail Sender"
                  value={''}
                  onInputChange={value => {
                    console.log(value);
                  }}
                />
              </StyledFormControl>
              <StyledFormControl>
                <ReactSelect
                  inputId="react-select-single"
                  isClearable={true}
                  label="Country"
                  onChange={value => {}}
                  options={stateLegalEntityRecommendations}
                  placeholder="Select Country"
                  value={''}
                />
              </StyledFormControl>
              <StyledFormControl>
                <ReactSelect
                  inputId="react-select-single"
                  isClearable={true}
                  label="City"
                  onChange={value => {}}
                  options={stateLegalEntityRecommendations}
                  placeholder="Select City"
                  value={''}
                />
              </StyledFormControl>
              <StyledFormControl>
                <TextField
                  fullWidth={true}
                  id="outlined-name"
                  label="Long Street"
                  onChange={() => {}}
                  value=""
                  margin="normal"
                  variant="filled"
                />
              </StyledFormControl>
            </React.Fragment>
          ) : null}
        </Box>
      </Paper>
      <StepAppBar label="Document" />
    </Container>
  );
};
