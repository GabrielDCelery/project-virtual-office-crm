import React, { useEffect, useState } from 'react';
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

    const ajaxInProgress = {
      cityRecommendations: stateIsFetchingCities,
      countryRecommendations: stateIsFetchingCountries,
      legalEntityRecommendations: stateIsFetchingLegalEntities,
      mailSenderNameRecommendations: stateIsMailSenderNamesAjaxRequestInProgress,
      mailSenderRecommendations: stateIsMailSendersAjaxRequestInProgress,
      mailSubjects: stateIsFetchingMailSubjects
    };

    const getterAjaxInProgress = objKey => {
      return ajaxInProgress[objKey];
    };

    const recommendations = {
      cities: stateCityRecommendations,
      countries: stateCountryRecommendations,
      legalEntities: stateLegalEntityRecommendations,
      mailSenderNames: stateMailSenderNameRecommendations,
      mailSenders: stateMailSenderRecommendations,
      mailSubjects: stateMailSubjectRecommendations
    };

    const getterRecommendations = objKey => {
      return recommendations[objKey];
    };

    const getterExistingMailSender = () => {
      return stateSelectedMailSender;
    };

    const handlersExistingMailSender = {
      actionSetSelectedMailSender
    };

    const handlerExistingMailSender = objKey => {
      return handlersExistingMailSender[objKey];
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

    const handlersNewMailSender = {
      actionCreateNewMailSenderNameAndReFetch,
      actionSetSelectedMailSenderName
    };

    const handlerNewMailSender = objKey => {
      return handlersNewMailSender[objKey];
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
          handlerNewMailSender,
          getterExistingMailSender,
          handlerExistingMailSender,
          getterAjaxInProgress,
          getterMailDocument,
          getterNewMailSender,
          getterRecommendations,
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
