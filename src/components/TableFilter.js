import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Toolbar, Tooltip, Typography, IconButton } from '@material-ui/core';
import { useStyles } from '../styles';

const TableToolbar = () => {
  const classes = useStyles();

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Search and filter
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default TableToolbar;
