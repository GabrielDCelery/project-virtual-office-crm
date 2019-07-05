import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  }
}));

export default ({
  stateAddresses
}) => {
  const classes = useStyles();
  
  return (
    <Container maxWidth={false}>
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Postcode</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Address Line 1</TableCell>
            <TableCell>Address Line 2</TableCell>
            <TableCell>Country Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stateAddresses.map(address => (
            <TableRow key={address.id}>
              <TableCell component="th" scope="row">
                {address.postcode}
              </TableCell>
              <TableCell>{address.city_name}</TableCell>
              <TableCell>{address.address_line_1}</TableCell>
              <TableCell>{address.address_line_2}</TableCell>
              <TableCell>{address.country_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </Container>
  );
}