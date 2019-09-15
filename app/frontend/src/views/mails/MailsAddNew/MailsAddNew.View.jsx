import React from 'react';
import _ from 'lodash';
import { Container, Tab, Tabs, TextField } from '@material-ui/core';

import {
  FormFieldControl,
  FormFileUpload,
  FormPaper,
  FormReactSelect,
  FormStep
} from 'components';

export default ({
  getterAjaxInProgress,
  getterNewMailSender,
  getterRecommendations,
  handleSetMailSenderActivePanel,
  mailReceiver,
  mailSender,
  mailSenderActivePanel,
  setMailReceiver,
  setMailSender,
  setterNewMailSender
}) => {
  return (
    <Container maxWidth="lg">
      <FormStep label="Mail Receiver">
        <FormPaper>
          <FormFieldControl>
            <FormReactSelect
              inputId="mail-sender-legal-entity"
              isClearable={true}
              isLoading={getterAjaxInProgress('legalEntityRecommendations')}
              label="Legal Entity"
              onChange={recommendation => setMailReceiver(recommendation)}
              options={getterRecommendations('legalEntities')}
              placeholder="Select a legal entity"
              value={mailReceiver}
            />
          </FormFieldControl>
        </FormPaper>
      </FormStep>

      <FormStep label="Mail Sender">
        <Tabs
          indicatorColor="primary"
          onChange={handleSetMailSenderActivePanel}
          textColor="primary"
          value={mailSenderActivePanel}
          style={{ background: '#eee' }}
        >
          <Tab label="Choose Existing Mail Sender" />
          <Tab label="Add New Mail Sender" />
        </Tabs>
        <FormPaper>
          {mailSenderActivePanel === 0 ? (
            <FormReactSelect
              inputId="mail-sender"
              isClearable={true}
              isLoading={getterAjaxInProgress('mailSenderRecommendations')}
              label="Mail Sender"
              onChange={recommendation => setMailSender(recommendation)}
              options={getterRecommendations('mailSenders')}
              placeholder="Select a mail sender"
              value={mailSender}
            />
          ) : null}
          {mailSenderActivePanel === 1 ? (
            <React.Fragment>
              <FormFieldControl>
                <FormReactSelect
                  inputId="react-select-single"
                  isClearable={true}
                  isLoading={getterAjaxInProgress(
                    'mailSenderNameRecommendations'
                  )}
                  onChange={recommendation =>
                    setterNewMailSender('name')(recommendation)
                  }
                  options={getterRecommendations('mailSenderNames')}
                  label="Mail Sender Name"
                  placeholder="Select or create Mail Sender Name"
                  value={getterNewMailSender('name')}
                  onInputChange={value => {
                    console.log(value);
                  }}
                />
              </FormFieldControl>
              <FormFieldControl>
                <FormReactSelect
                  inputId="react-select-single"
                  isClearable={true}
                  isLoading={getterAjaxInProgress('countryRecommendations')}
                  label="Country"
                  onChange={recommendation =>
                    setterNewMailSender('country')(recommendation)
                  }
                  options={getterRecommendations('countries')}
                  placeholder="Select Country"
                  value={getterNewMailSender('country')}
                />
              </FormFieldControl>
              <FormFieldControl>
                <FormReactSelect
                  inputId="react-select-single"
                  isClearable={true}
                  isLoading={getterAjaxInProgress('cityRecommendations')}
                  label="City"
                  onChange={recommendation => {
                    setterNewMailSender('city')(recommendation);
                    const country = _.get(recommendation, 'country');
                    if (country) {
                      setterNewMailSender('country')(country);
                    }
                  }}
                  options={getterRecommendations('cities')}
                  placeholder="Select City"
                  value={getterNewMailSender('city')}
                />
              </FormFieldControl>
              <FormFieldControl>
                <TextField
                  fullWidth={true}
                  id="outlined-name"
                  label="Long Street"
                  onChange={event =>
                    setterNewMailSender('street')(event.target.value)
                  }
                  value={getterNewMailSender('street')}
                />
              </FormFieldControl>
            </React.Fragment>
          ) : null}
        </FormPaper>
      </FormStep>

      <FormStep label="Document">
        <FormPaper>
          <FormFileUpload />
        </FormPaper>
      </FormStep>
    </Container>
  );
};
