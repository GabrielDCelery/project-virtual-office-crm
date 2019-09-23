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
  getter,
  getterMailDocument,
  handleSetMailSenderActivePanel,
  handler,
  mailReceiver,
  mailSenderActivePanel,
  setMailReceiver,
  setterMailDocument
}) => {
  return (
    <Container maxWidth="lg">
      <FormStep label="Mail Receiver">
        <FormPaper>
          <FormFieldControl>
            <FormReactSelect
              inputId="mail-sender-legal-entity"
              isClearable={true}
              isLoading={getter('ajaxInProgress', 'legalEntityRecommendations')}
              label="Legal Entity"
              onChange={recommendation => setMailReceiver(recommendation)}
              options={getter('recommendations', 'legalEntities')}
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
                isLoading={getter(
                  'ajaxInProgress',
                  'mailSenderRecommendations'
                )}
                label="Mail Sender"
                onChange={recommendation => {
                  handler('existingMailSender', 'actionSetSelectedMailSender')(
                    recommendation
                  );
                }}
                options={getter('recommendations', 'mailSenders')}
                placeholder="Select a mail sender"
                value={getter('fields', 'existingMailSender')}
              />
            </FormFieldControl>
          ) : null}
          {mailSenderActivePanel === 1 ? (
            <React.Fragment>
              <FormFieldControl>
                <FormReactCreateSelect
                  inputId="react-select-single"
                  isClearable={true}
                  isLoading={getter(
                    'ajaxInProgress',
                    'mailSenderNameRecommendations'
                  )}
                  onChange={recommendation => {
                    handler('newMailSender', 'actionSetSelectedMailSenderName')(
                      recommendation
                    );
                  }}
                  onCreateOption={mailSenderName => {
                    handler(
                      'newMailSender',
                      'actionCreateNewMailSenderNameAndReFetch'
                    )(mailSenderName);
                  }}
                  options={getter('recommendations', 'mailSenderNames')}
                  label="Mail Sender Name"
                  placeholder="Select or create Mail Sender Name"
                  value={getter('fields', 'newMailSender', 'name')}
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
                  onChange={event => {
                    handler('newMailSender', 'setPostcode')(event.target.value);
                  }}
                  value={getter('newMailSender', 'postcode')}
                />
              </FormFieldControl>

              <FormFieldControl>
                <FormReactSelect
                  inputId="react-select-single"
                  isClearable={true}
                  isLoading={getter('ajaxInProgress', 'countryRecommendations')}
                  label="Country"
                  onChange={recommendation => {
                    handler('newMailSender', 'actionSetSelectedCountry')(
                      recommendation
                    );
                  }}
                  options={getter('recommendations', 'countries')}
                  placeholder="Select Country"
                  value={getter('fields', 'newMailSender', 'country')}
                />
              </FormFieldControl>

              <FormFieldControl>
                <FormReactSelect
                  inputId="react-select-single"
                  isClearable={true}
                  isLoading={getter('ajaxInProgress', 'cityRecommendations')}
                  label="City"
                  onChange={recommendation => {
                    handler('newMailSender', 'actionSetSelectedCity')(
                      recommendation
                    );
                    const country = _.get(recommendation, 'country');
                    if (country) {
                      handler('newMailSender', 'actionSetSelectedCountry')(
                        country
                      );
                    }
                  }}
                  options={getter('recommendations', 'cities')}
                  placeholder="Select City"
                  value={getter('fields', 'newMailSender', 'city')}
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
                  onChange={event => {
                    handler('newMailSender', 'setStreet')(event.target.value);
                  }}
                  value={getter('newMailSender', 'street')}
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
              isLoading={getter('ajaxInProgress', 'mailSubjects')}
              label="Mail Subject"
              onChange={recommendation => {
                setterMailDocument('subject')(recommendation);
              }}
              options={getter('recommendations', 'mailSubjects')}
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
              defaultValue={getter('document', 'receivedDate')}
              onChange={event => {
                handler('document', 'setReceivedDate')(event.target.value);
              }}
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
