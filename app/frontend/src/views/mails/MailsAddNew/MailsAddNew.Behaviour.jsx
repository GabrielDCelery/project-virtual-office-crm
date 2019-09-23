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
      actionSetSelectedMailSender,
      actionSetSelectedMailSenderName,
      stateCityRecommendations,
      stateCountryRecommendations,
      stateIsFetchingCities,
      stateIsFetchingCountries,
      stateIsFetchingLegalEntities,
      stateIsFetchingMailSubjects,
      stateIsMailSenderNamesAjaxRequestInProgress,
      stateIsMailSendersAjaxRequestInProgress,
      stateLegalEntityRecommendations,
      stateMailSenderNameRecommendations,
      stateMailSenderRecommendations,
      stateMailSubjectRecommendations,
      stateSelectedMailSender,
      stateSelectedMailSenderName
    } = props;

    const [mailReceiver, setMailReceiver] = useState(null);
    const [mailSenderActivePanel, setMailSenderActivePanel] = useState(0);

    const getters = {
      ajaxInProgress: {
        cityRecommendations: stateIsFetchingCities,
        countryRecommendations: stateIsFetchingCountries,
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
        existingMailSender: stateSelectedMailSender
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
        actionSetSelectedMailSenderName
      }
    };

    const handler = (...paths) => {
      return _.get(handlers, paths);
    };

    const initialStateNewMailSender = {
      city: null,
      country: null,
      postcode: '',
      street: ''
    };

    const [stateNewMailSender, setNewMailSender] = useState(
      JSON.parse(JSON.stringify(initialStateNewMailSender))
    );

    const getterNewMailSender = objKey => {
      return stateNewMailSender[objKey];
    };

    const setterNewMailSender = objKey => value => {
      setNewMailSender(stateNewMailSender => {
        return {
          ...stateNewMailSender,
          [objKey]: value
        };
      });
    };

    const initialStateMailDocument = {
      subject: null,
      receivedDate: moment(new Date()).format('YYYY-MM-DD')
    };

    const [stateMailDocument, setMailDocument] = useState(
      JSON.parse(JSON.stringify(initialStateMailDocument))
    );

    const getterMailDocument = objKey => {
      return stateMailDocument[objKey];
    };

    const setterMailDocument = objKey => value => {
      setMailDocument(stateMailDocument => {
        return {
          ...stateMailDocument,
          [objKey]: value
        };
      });
    };

    const handleSetMailSenderActivePanel = (event, newValue) => {
      setMailSenderActivePanel(newValue);
      setNewMailSender(JSON.parse(JSON.stringify(initialStateNewMailSender)));
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
          getterMailDocument,
          getterNewMailSender,
          handleSetMailSenderActivePanel,
          mailReceiver,
          mailSenderActivePanel,
          setMailReceiver,
          setterMailDocument,
          setterNewMailSender,
          stateSelectedMailSenderName
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
