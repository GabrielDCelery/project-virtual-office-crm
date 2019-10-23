import React, { useState } from 'react';
import _ from 'lodash';

export default ToWrapComponent => {
  let ActionableDataTableBehaviour = props => {
    const { items } = props;
    const [currentPage, setCurrentPage] = useState(0);
    const [numOfRecordsPerPage, setNumOfRecordsPerPage] = useState(10);

    const getters = {
      pagination: {
        currentPage,
        numOfRecordsPerPage
      }
    };

    const getter = (...paths) => {
      return _.get(getters, paths);
    };

    const handlers = {
      pagination: {
        setCurrentPage,
        setNumOfRecordsPerPage
      }
    };

    const handler = (...paths) => {
      return _.get(handlers, paths);
    };

    return <ToWrapComponent {...props} {...{ getter, handler, items }} />;
  };

  return ActionableDataTableBehaviour;
};
