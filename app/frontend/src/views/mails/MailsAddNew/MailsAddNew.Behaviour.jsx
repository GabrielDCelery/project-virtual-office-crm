import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  CitiesStoreDecorator,
  CountriesStoreDecorator,
  LegalEntitiesStoreDecorator,
  MailsStoreDecorator
} from 'components';
import services from 'services';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    const {
      actionCreateNewMailSenderNameAndReFetch,
      actionCreateNewMailSubjectAndReFetch,
      actionFindAllCities,
      actionFindAllCountries,
      actionFindAllMailSenderNames,
      actionFindAllMailSenders,
      actionFindAllMailSubjects,
      actionGetAllVersionsOfAllEntities,
      actionSetSelectedCity,
      actionSetSelectedCountry,
      actionSetSelectedMailSender,
      actionSetSelectedMailSenderName,
      stateCityRecommendations,
      stateCountryRecommendations,
      stateIsCitiesAjaxRequestInProgress,
      stateIsCountriesAjaxRequestInProgress,
      stateIsFetchingLegalEntities,
      stateIsFetchingMailSubjects,
      stateIsMailSenderNamesAjaxRequestInProgress,
      stateIsMailSendersAjaxRequestInProgress,
      stateLegalEntityRecommendations,
      stateMailSenderNameRecommendations,
      stateMailSenderRecommendations,
      stateMailSubjectRecommendations,
      stateSelectedCity,
      stateSelectedCountry,
      stateSelectedMailSender,
      stateSelectedMailSenderName,
      actionSetSelectedMailSubject,
      stateSelectedMailSubject
    } = props;

    const [stateMailReceiver, setMailReceiver] = useState(null);

    const [stateMailSenderActivePanel, setMailSenderActivePanel] = useState(0);

    const [statePostcode, setPostcode] = useState('');
    const [stateStreet, setStreet] = useState('');

    const [stateReceivedDate, setReceivedDate] = useState(
      moment(new Date()).format('YYYY-MM-DD')
    );
    const [stateFile, setFile] = useState(null);

    const getters = {
      ajaxInProgress: {
        cityRecommendations: stateIsCitiesAjaxRequestInProgress,
        countryRecommendations: stateIsCountriesAjaxRequestInProgress,
        legalEntityRecommendations: stateIsFetchingLegalEntities,
        mailSenderNameRecommendations: stateIsMailSenderNamesAjaxRequestInProgress,
        mailSenderRecommendations: stateIsMailSendersAjaxRequestInProgress,
        mailSubjects: stateIsFetchingMailSubjects
      },
      recommendations: {
        cities: stateCityRecommendations,
        countries: stateCountryRecommendations,
        legalEntities: stateLegalEntityRecommendations,
        mailSenderNames: stateMailSenderNameRecommendations,
        mailSenders: stateMailSenderRecommendations,
        mailSubjects: stateMailSubjectRecommendations
      },
      fields: {
        mailReceiver: stateMailReceiver,
        existingMailSender: stateSelectedMailSender,
        newMailSender: {
          city: stateSelectedCity,
          country: stateSelectedCountry,
          name: stateSelectedMailSenderName,
          postcode: statePostcode,
          street: stateStreet
        },
        mailDetails: {
          receivedDate: stateReceivedDate,
          subject: stateSelectedMailSubject
        },
        document: {
          file: stateFile
        }
      },
      layout: {
        mailSenderActivePanel: stateMailSenderActivePanel
      },
      callbacks: {
        document: {
          fileName: useCallback(() => {
            if (!stateFile) {
              return null;
            }

            const fileName = services.documents.nameGenerator.create([
              {
                type: 'date',
                value: stateReceivedDate
              },
              {
                type: 'string',
                value:
                  stateMailSenderActivePanel === 0
                    ? _.get(stateSelectedMailSender, 'name')
                    : _.get(stateSelectedMailSenderName, 'label')
              },
              {
                type: 'string',
                value: _.get(stateSelectedMailSubject, 'label')
              },
              {
                type: 'integer',
                value: new Date().getTime()
              },
              {
                type: 'string',
                value: _.get(stateMailReceiver, 'name')
              }
            ]);

            return `${fileName}.pdf`;
          }, [
            stateFile,
            stateMailReceiver,
            stateMailSenderActivePanel,
            stateReceivedDate,
            stateSelectedMailSender,
            stateSelectedMailSenderName,
            stateSelectedMailSubject
          ])
        },
        form: {
          isReadyToSubmit: useCallback(() => {
            const bFileUploaded = !!stateFile;
            const bMailReceiverSet = !!stateMailReceiver;
            const bMailSenderSet =
              stateMailSenderActivePanel === 0
                ? !!stateSelectedMailSender
                : stateSelectedCity &&
                  stateSelectedCountry &&
                  stateSelectedMailSenderName &&
                  statePostcode &&
                  stateStreet;
            const bMailSubjectSet = !!stateSelectedMailSubject;
            const bReceivedDateSet = !!stateReceivedDate;

            return (
              bFileUploaded &&
              bMailReceiverSet &&
              bMailSenderSet &&
              bMailSubjectSet &&
              bReceivedDateSet
            );
          }, [
            stateFile,
            stateMailReceiver,
            stateMailSenderActivePanel,
            statePostcode,
            stateReceivedDate,
            stateSelectedCity,
            stateSelectedCountry,
            stateSelectedMailSender,
            stateSelectedMailSenderName,
            stateSelectedMailSubject,
            stateStreet
          ]),
          submit: useCallback(() => {
            const data = {
              receiver: stateMailReceiver['value'],
              sender: stateSelectedMailSender
                ? stateSelectedMailSender['value']
                : {
                    city: stateSelectedCity['value'],
                    country: stateSelectedCountry['value'],
                    name: stateSelectedMailSenderName['value'],
                    postcode: statePostcode,
                    street: stateStreet
                  },
              receivedDate: stateReceivedDate,
              subject: stateSelectedMailSubject['value'],
              file: stateFile
            };
            console.log(data);
          }, [
            stateFile,
            stateMailReceiver,
            statePostcode,
            stateReceivedDate,
            stateSelectedCity,
            stateSelectedCountry,
            stateSelectedMailSender,
            stateSelectedMailSenderName,
            stateSelectedMailSubject,
            stateStreet
          ])
        }
      }
    };

    const getter = (...paths) => {
      return _.get(getters, paths);
    };

    const handlers = {
      mailReceiver: {
        setMailReceiver
      },
      existingMailSender: {
        actionSetSelectedMailSender
      },
      newMailSender: {
        actionCreateNewMailSenderNameAndReFetch,
        actionSetSelectedCity,
        actionSetSelectedCountry,
        actionSetSelectedMailSenderName,
        setPostcode,
        setStreet
      },
      mailDetails: {
        actionCreateNewMailSubjectAndReFetch,
        actionSetSelectedMailSubject,
        setReceivedDate
      },
      document: {
        setFile
      },
      layout: {
        setMailSenderActivePanel
      }
    };

    const handler = (...paths) => {
      return _.get(handlers, paths);
    };

    useEffect(() => {
      (async () => {
        await actionFindAllCities();
        await actionFindAllCountries();
        await actionFindAllMailSenderNames();
        await actionFindAllMailSenders();
        await actionFindAllMailSubjects();
        await actionGetAllVersionsOfAllEntities();
      })();
    }, [
      actionFindAllMailSubjects,
      actionFindAllCities,
      actionFindAllCountries,
      actionFindAllMailSenderNames,
      actionFindAllMailSenders,
      actionGetAllVersionsOfAllEntities
    ]);

    return (
      <ToWrapComponent
        {...{
          getter,
          handler
        }}
      />
    );
  };

  WrapperComponent = CitiesStoreDecorator(WrapperComponent);
  WrapperComponent = CountriesStoreDecorator(WrapperComponent);
  WrapperComponent = LegalEntitiesStoreDecorator(WrapperComponent);
  WrapperComponent = MailsStoreDecorator(WrapperComponent);

  return WrapperComponent;
};
