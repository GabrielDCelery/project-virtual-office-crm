import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => {
  return {
    root: {
      display: 'flex'
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    paper: {
      background: '#082431'
    },
    iconButton: {
      backgroundColor: '#2c9fda',
      '&:hover': {
        backgroundColor: '#2c9fda' 
      }
    },
    icon: {
      color: '#fff'
    },
    iconText: {
      color: '#fff'
    }
  }
};

export default ToWrapComponent => {
  return withStyles(styles)(props => <ToWrapComponent {...props} />);
}