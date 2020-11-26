import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
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
          <TextField size="small" label="Search by name" variant="outlined" {...nameFilter} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField size="small" label="Search by color" variant="outlined" {...colorFilter} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            size="small"
            label="Search by manufacturer"
            variant="outlined"
            {...manufacturerFilter}
          />
        </Grid>
      </Grid>
      <IconButton onClick={resetFilter}>
        <RotateLeftIcon />
      </IconButton>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  nameFilter: PropTypes.object.isRequired,
  manufacturerFilter: PropTypes.object.isRequired,
  colorFilter: PropTypes.object.isRequired,
};

export default TableToolbar;
