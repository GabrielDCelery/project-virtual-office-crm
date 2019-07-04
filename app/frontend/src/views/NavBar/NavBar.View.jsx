import React, { useState } from 'react';
import {
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@material-ui/core';
import {
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Layers as LayersIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Icons = {
  DashboardIcon,
  SearchIcon,
  PersonIcon,
  LayersIcon
};

const SingleNavBarItem = ({ classes, label, Icon, bIsActive, path }) => (
  <Link to={path} style={{ textDecoration: 'none' }}>
    <ListItem
      button
      className={`${classes.listItem} ${bIsActive ? 'active' : ''}`}
    >
      <ListItemIcon><Icon className={classes.listItemIcon} /></ListItemIcon>
      <ListItemText
        primary={label}
        className={classes.listItemText}
      />
    </ListItem>
  </Link>
);

const DropDownNavBarItem = ({ classes, label, Icon, bIsActive, children }) => {
  const [bIsOpen, setOpen] = useState(false);

  return (
    <React.Fragment>
      <div onClick={() => setOpen(!bIsOpen)}>
        <ListItem
          button
          className={`${classes.listItem} ${bIsActive ? 'active' : ''}`}
        >
          <ListItemIcon>
            <Icon className={classes.listItemIcon} />
          </ListItemIcon>
          <ListItemText
            primary={label}
            className={classes.listItemText}
          />
          {
            bIsActive || bIsOpen ?
              <ExpandLessIcon className={classes.listItemIcon} />
              :
              <ExpandMoreIcon className={classes.listItemIcon} />
          }
        </ListItem>
        <Collapse in={bIsActive || bIsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map(({ label, bIsActive, path }, index) => (
              <React.Fragment key={`navbar-item-collapsible-${index}`}>
                <Link to={path} style={{ textDecoration: 'none' }}>
                  <ListItem
                    button
                    className={`${classes.listItem} ${bIsActive ? 'active' : ''}`}
                  >
                    <ListItemText primary={label} className={classes.listItemText} />
                  </ListItem>
                </Link>
              </React.Fragment>
            ))}
          </List>
        </Collapse>
      </div>
    </React.Fragment>
  )
};

export default ({
  classes,
  navbarItems
}) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {navbarItems.map(({ label, icon, bIsActive, path, children }, index) => {
            const Icon = Icons[icon];

            return (
              <React.Fragment key={`navbar-item-${index}`}>
                {
                  children ?
                    <DropDownNavBarItem {...{ classes, label, Icon, bIsActive, children }} />
                    :
                    <SingleNavBarItem {...{ classes, label, Icon, bIsActive, path }} />
                }
              </React.Fragment>
            )
          })}
        </List>
      </Drawer>
    </React.Fragment>
  );
}
