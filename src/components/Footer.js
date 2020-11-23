import React from 'react';
import { Typography, Box, Link } from '@material-ui/core';

const Footer = () => {
  return (
    <Box bgcolor="lavender" p={3}>
      <Link
        color="textPrimary"
        href="https://github.com/DianaMukaliyeva"
        rel="noreferrer"
        target="_blank">
        <i class="fab fa-github fa-lg"></i>
        <Typography component="span"> Diana Mukaliyeva</Typography>
      </Link>
      <Typography component="div">Reaktor assignment for Junior Developer, Spring 2021</Typography>
    </Box>
  );
};

export default Footer;
