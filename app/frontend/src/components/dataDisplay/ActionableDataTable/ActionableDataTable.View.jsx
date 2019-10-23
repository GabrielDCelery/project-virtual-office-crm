import React from 'react';
import { TablePagination } from '@material-ui/core';

const ActionableDataTableView = ({ getter, handler, items }) => {
  return (
    <React.Fragment>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={items.length}
        rowsPerPage={getter('pagination', 'numOfRecordsPerPage')}
        page={getter('pagination', 'currentPage')}
        backIconButtonProps={{
          'aria-label': 'previous page'
        }}
        nextIconButtonProps={{
          'aria-label': 'next page'
        }}
        onChangePage={(e, newPage) => {
          handler('pagination', 'setCurrentPage')(newPage);
        }}
        onChangeRowsPerPage={e => {
          handler('pagination', 'setNumOfRecordsPerPage')(e.target.value);
        }}
      />
    </React.Fragment>
  );
};

export default ActionableDataTableView;
