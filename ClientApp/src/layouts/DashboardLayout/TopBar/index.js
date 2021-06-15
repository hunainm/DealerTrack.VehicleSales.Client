import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
  SvgIcon
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import { THEMES } from 'src/constants';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...(theme.name === THEMES.LIGHT
      ? {
          boxShadow: 'none',
          backgroundColor: '#00599a'
        }
      : {}),
  },
  toolbar: {
    minHeight: 64
  },
  menuitems: {
    marginLeft: 'auto'
  },
  dashboardHeading: {
    marginLeft: 500,
    fontWeight: "bold"
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Box ml={10}>
          <img
            alt="Logo"
            // src="/static/logo.svg"
            height="50"
            src="/static/logo.png"
          />
        </Box>
        <Box className={classes.dashboardHeading}>
          DEALERTRACK SALES DASHBOARD
        </Box>
        <Box className={classes.menuitems}>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <SvgIcon fontSize="small">
                <MenuIcon />
              </SvgIcon>
            </IconButton>
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

TopBar.defaultProps = {
  onMobileNavOpen: () => {}
};

export default TopBar;
