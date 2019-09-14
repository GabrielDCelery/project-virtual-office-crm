import React, { useEffect, useState } from 'react';
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
      actionGetAllVersionsOfAllEntities,
      stateCityRecommendations,
      stateCountryRecommendations,
      stateIsFetchingCities,
      stateIsFetchingCountries,
      stateIsFetchingLegalEntities,
      stateIsFetchingMailSenderNames,
      stateIsFetchingMailSenders,
      stateLegalEntityRecommendations,
      stateMailSenderNameRecommendations,
      stateMailSenderRecommendations
    } = props;

    const [mailReceiver, setMailReceiver] = useState(null);
    const [mailSender, setMailSender] = useState(null);
    const [mailSenderActivePanel, setMailSenderActivePanel] = useState(0);

    const ajaxInProgress = {
      mailSenderRecommendations: stateIsFetchingMailSenders,
      mailSenderNameRecommendations: stateIsFetchingMailSenderNames,
      legalEntityRecommendations: stateIsFetchingLegalEntities,
      countryRecommendations: stateIsFetchingCountries,
      cityRecommendations: stateIsFetchingCities
    };

    const getterAjaxInProgress = objKey => {
      return ajaxInProgress[objKey];
    };

    const recommendations = {
      cities: stateCityRecommendations,
      countries: stateCountryRecommendations,
      legalEntities: stateLegalEntityRecommendations,
      mailSenderNames: stateMailSenderNameRecommendations,
      mailSenders: stateMailSenderRecommendations
    };

    const getterRecommendations = objKey => {
      return recommendations[objKey];
    };

    const initialStateNewMailSender = {
      name: null,
      country: null,
      city: null,
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
        await actionGetAllVersionsOfAllEntities();
      })();
    }, [
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
          getterNewMailSender,
          getterRecommendations,
          handleSetMailSenderActivePanel,
          mailReceiver,
          mailSender,
          mailSenderActivePanel,
          setMailReceiver,
          setMailSender,
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
