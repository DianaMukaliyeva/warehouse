import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Tabs, Tab, Container } from '@material-ui/core';

const CustomTabs = () => {
  let location = useLocation();
  const tabs = ['/category/jackets', '/category/shirts', '/category/accessories'];
  let tab = location.pathname;

  if (!tabs.includes(tab)) {
    tab = '/';
    location = tab;
  }

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Tabs variant="scrollable" scrollButtons="on" value={tab}>
          <Tab style={{ display: 'none' }} label="hidden" value="/" />
          <Tab label="Jackets" value="/category/jackets" component={Link} to="/category/jackets" />
          <Tab label="Shirts" value="/category/shirts" component={Link} to="/category/shirts" />
          <Tab
            label="Accessories"
            value="/category/accessories"
            component={Link}
            to="/category/accessories"
          />
        </Tabs>
      </Box>
    </Container>
  );
};

export default CustomTabs;
