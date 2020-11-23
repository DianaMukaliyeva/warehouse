import React from 'react';
import { Link } from 'react-router-dom';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { AppBar, Box, Toolbar, IconButton } from '@material-ui/core';
import CustomTabs from './CustomTabs';

const Navigation = () => {
  return (
    <AppBar color="inherit" position="sticky">
      <Box bgcolor="wheat">
        <Toolbar>
          <Link style={{ textDecoration: 'none' }} to="/">
            <IconButton edge="start">
              <AccountBalanceIcon />
              <Box pl={1}>Warehouse</Box>
            </IconButton>
          </Link>
        </Toolbar>
      </Box>
      <CustomTabs />
    </AppBar>
  );
};

export default Navigation;
