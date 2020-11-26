import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Tabs, Tab, Container } from '@material-ui/core';
import { useStyles } from '../styles';
import categories from '../categories';

const CustomTabs = () => {
  const location = useLocation();
  const classes = useStyles();
  const tabs = categories.map((item) => {
    let newObject = {};
    newObject['index'] = item.id;
    newObject['path'] = `/category/${item.product}`;
    newObject['name'] = item.product;
    return newObject;
  });

  let tab = location.pathname;

  if (!tabs.some((e) => e.path === tab)) {
    tab = '/';
  }

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Tabs variant="scrollable" indicatorColor="primary" scrollButtons="on" value={tab}>
          <Tab className={classes.hidden} label="hidden" value="/" />
          {tabs.map((item) => (
            <Tab
              key={item.index}
              label={item.name}
              value={item.path}
              component={Link}
              to={item.path}
            />
          ))}
        </Tabs>
      </Box>
    </Container>
  );
};

export default CustomTabs;
