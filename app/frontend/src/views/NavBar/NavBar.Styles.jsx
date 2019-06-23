import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const DRAWER_WIDTH = 240;

const styles = theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    backgroundColor: '#082431'
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: '#082431'
  },
  listItem: {
    borderTop: '1px solid #0d3346',
    borderBottom: '1px solid #0d3346',
    backgroundColor: '#082431',
    transition: 'all 0.5s ease-in-out',
    '&:hover, &.active': {
      backgroundColor: '#2c9fda',
      borderColor: '#46B9F4'
    },
    '&:hover $listItemIcon, &.active $listItemIcon': {
      color: '#fff'
    },
    '&:hover $listItemText, &.active $listItemText': {
      color: '#fff'
    }
  },
  listItemIcon: {
    color: '#aaa',
    transition: 'all 0.5s ease-in-out'
  },
  listItemText: {
    color: '#aaa',
    transition: 'all 0.5s ease-in-out'
  },
  nestedListItem: {
    borderTop: '1px solid #0d3346',
    borderBottom: '1px solid #0d3346',
    backgroundColor: '#082431',
    transition: 'all 0.5s ease-in-out',
    '&:hover, &.active': {
      backgroundColor: '#006CA7',
      borderColor: '#1386C1'
    },
    '&:hover $nestedListItemText, &.active $nestedListItemText': {
      color: '#fff'
    }
  },
  nestedListItemText: {
    color: '#aaa',
    transition: 'all 0.5s ease-in-out'
  }
});

export default ToWrapComponent => {
  return withStyles(styles)(props => <ToWrapComponent {...props} />);
}