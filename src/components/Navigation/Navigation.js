import React from 'react';
import { Link } from 'react-router-dom';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { AppBar, Box, Toolbar, IconButton } from '@material-ui/core';
import CustomTabs from './CustomTabs';
import { useStyles } from '../../styles';

const Navigation = () => {
  const classes = useStyles();

  return (
    <AppBar id="navigation" color="inherit" position="sticky">
      <Box bgcolor="midnightblue">
        <Toolbar>
          <Link className={classes.textDecorNone} to="/">
            <IconButton color="secondary" edge="start">
              <AccountBalanceIcon />
              <Box color="white" pl={1}>
                Warehouse
              </Box>
            </IconButton>
          </Link>
        </Toolbar>
      </Box>
      <CustomTabs />
    </AppBar>
  );
};

export default Navigation;
