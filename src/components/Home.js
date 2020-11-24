import React from 'react';
import { Typography, Box, Paper } from '@material-ui/core';

const Home = () => {
  return (
    <>
      <Box p={3}>
        <Typography variant="h4">Warehouse for clothing brand</Typography>
      </Box>
      <Paper>
        <Box p={3} textAlign="left">
          <Typography variant="subtitle1">
            This is a simple web app where you can check product information and availability.
          </Typography>
          <br />
          <Typography variant="subtitle1">
            There are three product categories: jackets, shirts, and accessories. You can easily
            switch between product categories by clicking on category name in navigation. You can
            sort each category by name, price, color or availability. You could display list by 25,
            50 or 100 products per page.
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default Home;
