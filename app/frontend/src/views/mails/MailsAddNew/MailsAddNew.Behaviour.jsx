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
      actionFindAllCities,
      actionFindAllCountries,
      actionFindAllMailSenderNames,
      actionFindAllMailSenders,
      actionFindAllMailSubjects,
      actionGetAllVersionsOfAllEntities,
      stateCityRecommendations,
      stateCountryRecommendations,
      stateIsFetchingCities,
      stateIsFetchingCountries,
      stateIsFetchingLegalEntities,
      stateIsFetchingMailSenderNames,
      stateIsFetchingMailSenders,
      stateIsFetchingMailSubjects,
      stateLegalEntityRecommendations,
      stateMailSenderNameRecommendations,
      stateMailSenderRecommendations,
      stateMailSubjectRecommendations
    } = props;

    const [mailReceiver, setMailReceiver] = useState(null);
    const [mailSender, setMailSender] = useState(null);
    const [mailSenderActivePanel, setMailSenderActivePanel] = useState(0);

    const ajaxInProgress = {
      cityRecommendations: stateIsFetchingCities,
      countryRecommendations: stateIsFetchingCountries,
      legalEntityRecommendations: stateIsFetchingLegalEntities,
      mailSenderNameRecommendations: stateIsFetchingMailSenderNames,
      mailSenderRecommendations: stateIsFetchingMailSenders,
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

    const initialStateNewMailSender = {
      city: null,
      country: null,
      name: null,
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
      setMailSender(null);
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
          getterAjaxInProgress,
          getterMailDocument,
          getterNewMailSender,
          getterRecommendations,
          handleSetMailSenderActivePanel,
          mailReceiver,
          mailSender,
          mailSenderActivePanel,
          setMailReceiver,
          setMailSender,
          setterMailDocument,
          setterNewMailSender
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
