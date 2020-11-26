import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const TableToolbar = ({ nameFilter, manufacturerFilter, colorFilter }) => {
  const resetFilter = () => {
    nameFilter.onReset();
    colorFilter.onReset();
    manufacturerFilter.onReset();
  };

  return (
    <Toolbar>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <TextField size="small" label="Filter by name" variant="outlined" {...nameFilter} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField size="small" label="Filter by color" variant="outlined" {...colorFilter} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            size="small"
            label="Filter by manufacturer"
            variant="outlined"
            {...manufacturerFilter}
          />
        </Grid>
      </Grid>
      <Tooltip title="Reset filter">
        <IconButton onClick={resetFilter}>
          <RotateLeftIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  nameFilter: PropTypes.object.isRequired,
  manufacturerFilter: PropTypes.object.isRequired,
  colorFilter: PropTypes.object.isRequired,
};

export default TableToolbar;
