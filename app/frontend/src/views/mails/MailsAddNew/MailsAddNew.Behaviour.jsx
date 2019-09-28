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
        document: {
          file: stateFile,
          receivedDate: stateReceivedDate,
          subject: stateSelectedMailSubject
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
                    : null
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
            stateSelectedMailSubject
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
      document: {
        actionCreateNewMailSubjectAndReFetch,
        actionSetSelectedMailSubject,
        setFile,
        setReceivedDate
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
        //{...props}
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
