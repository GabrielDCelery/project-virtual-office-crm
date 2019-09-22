import React from 'react';
import _ from 'lodash';
import { Container, Tab, Tabs, TextField } from '@material-ui/core';
import {
  FormFieldControl,
  FormFileUpload,
  FormPaper,
  FormReactCreateSelect,
  FormReactSelect,
  FormStep
} from 'components';

export default ({
  getterAjaxInProgress,
  getterExistingMailSender,
  getterMailDocument,
  getterNewMailSender,
  getterRecommendations,
  handleSetMailSenderActivePanel,
  handlerExistingMailSender,
  handlerNewMailSender,
  mailReceiver,
  mailSenderActivePanel,
  setMailReceiver,
  setterMailDocument,
  setterNewMailSender,
  stateSelectedMailSenderName
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
            <FormFieldControl>
              <FormReactSelect
                inputId="mail-sender"
                isClearable={true}
                isLoading={getterAjaxInProgress('mailSenderRecommendations')}
                label="Mail Sender"
                onChange={recommendation => {
                  handlerExistingMailSender('actionSetSelectedMailSender')(
                    recommendation
                  );
                }}
                options={getterRecommendations('mailSenders')}
                placeholder="Select a mail sender"
                value={getterExistingMailSender()}
              />
            </FormFieldControl>
          ) : null}
          {mailSenderActivePanel === 1 ? (
            <React.Fragment>
              <FormFieldControl>
                <FormReactCreateSelect
                  inputId="react-select-single"
                  isClearable={true}
                  isLoading={getterAjaxInProgress(
                    'mailSenderNameRecommendations'
                  )}
                  onChange={recommendation => {
                    handlerNewMailSender('actionSetSelectedMailSenderName')(
                      recommendation
                    );
                  }}
                  onCreateOption={mailSenderName => {
                    handlerNewMailSender(
                      'actionCreateNewMailSenderNameAndReFetch'
                    )(mailSenderName);
                  }}
                  options={getterRecommendations('mailSenderNames')}
                  label="Mail Sender Name"
                  placeholder="Select or create Mail Sender Name"
                  value={stateSelectedMailSenderName}
                />
              </FormFieldControl>

              <FormFieldControl>
                <TextField
                  fullWidth={true}
                  id="outlined-name"
                  label="Postcode"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={event =>
                    setterNewMailSender('postcode')(event.target.value)
                  }
                  value={getterNewMailSender('postcode')}
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
                  InputLabelProps={{
                    shrink: true
                  }}
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
          <FormFieldControl>
            <FormReactSelect
              inputId="react-select-single"
              isClearable={true}
              isLoading={getterAjaxInProgress('mailSubjects')}
              label="Mail Subject"
              onChange={recommendation => {
                setterMailDocument('subject')(recommendation);
              }}
              options={getterRecommendations('mailSubjects')}
              placeholder="Select Mail Subject"
              value={getterMailDocument('subject')}
            />
          </FormFieldControl>

          <FormFieldControl>
            <TextField
              id="date"
              label="Received Date"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              defaultValue={getterMailDocument('receivedDate')}
              onChange={setterMailDocument('receivedDate')}
            />
          </FormFieldControl>

          <FormFieldControl>
            <FormFileUpload
              selectedFile={''}
              customFileName={'Something'}
              handleSetFile={() => {}}
              handleClearFile={() => {}}
            />
          </FormFieldControl>
        </FormPaper>
      </FormStep>
    </Container>
  );
};
