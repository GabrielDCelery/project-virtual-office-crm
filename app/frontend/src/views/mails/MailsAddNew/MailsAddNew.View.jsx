import React, { useState } from 'react';
import { Container, Paper } from '@material-ui/core';
import { StepAppBar } from 'components';
import Select from 'react-select';

export default ({
  stateIsFetchingLegalEntities,
  stateIsFetchingMailSenders,
  stateMailSenderRecommendations,
  stateLegalEntityRecommendations
}) => {
  const [single, setSingle] = useState(null);
  const [single2, setSingle2] = useState(null);

  function handleChangeSingle(value) {
    setSingle(value);
  }

  function handleChangeSingle2(value) {
    setSingle2(value);
  }

  return (
    <Container maxWidth={false}>
      <StepAppBar label="Mail Receiver (Legal Entity)" />
      <Paper>
        <Select
          inputId="react-select-single"
          TextFieldProps={{
            label: 'Country',
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true
            }
          }}
          placeholder="Select a legal entity"
          isClearable={true}
          isLoading={stateIsFetchingLegalEntities}
          options={stateLegalEntityRecommendations}
          value={single}
          onChange={handleChangeSingle}
        />
      </Paper>
      <StepAppBar label="Mail Sender" />
      <Paper>
        <Select
          inputId="react-select-single"
          TextFieldProps={{
            label: 'Country',
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true
            }
          }}
          placeholder="Select a mail sender"
          isClearable={true}
          isLoading={stateIsFetchingMailSenders}
          options={stateMailSenderRecommendations}
          value={single2}
          onChange={handleChangeSingle2}
        />
      </Paper>
      <StepAppBar label="Document" />
    </Container>
  );
};
