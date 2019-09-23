import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  CitiesStoreDecorator,
  CountriesStoreDecorator,
  LegalEntitiesStoreDecorator,
  MailsStoreDecorator
} from 'components';

export default ToWrapComponent => {
  let WrapperComponent = props => {
    const {
      actionCreateNewMailSenderNameAndReFetch,
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

    const [mailReceiver, setMailReceiver] = useState(null);
    const [mailSenderActivePanel, setMailSenderActivePanel] = useState(0);

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
      }
    };

    const getter = (...paths) => {
      return _.get(getters, paths);
    };

    const handlers = {
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
        actionSetSelectedMailSubject,
        setFile,
        setReceivedDate
      }
    };

    const handler = (...paths) => {
      return _.get(handlers, paths);
    };

    const handleSetMailSenderActivePanel = (event, newValue) => {
      setMailSenderActivePanel(newValue);
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
        {...props}
        {...{
          getter,
          handler,
          handleSetMailSenderActivePanel,
          mailReceiver,
          mailSenderActivePanel,
          setMailReceiver
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
