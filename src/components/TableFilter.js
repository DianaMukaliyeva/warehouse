import React from 'react';
import PropTypes from 'prop-types';
import FilterListIcon from '@material-ui/icons/FilterList';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles';

const TableToolbar = ({
  filter,
  setFilter,
  nameFilter,
  manufacturerFilter,
  priceFilter,
  colorFilter,
}) => {
  const classes = useStyles();

  return (
    <>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {filter.open ? 'Filter' : ''}
        </Typography>
        <Tooltip title="Filter list">
          <IconButton
            className={classes.right}
            onClick={() => setFilter({ ...filter, open: !filter.open })}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Collapse in={filter.open} timeout="auto" unmountOnExit>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <TextField size="small" label="by name" variant="outlined" {...nameFilter} />
            <TextField size="small" label="by color" variant="outlined" {...colorFilter} />
            <TextField size="small" label="by price" variant="outlined" {...priceFilter} />
            <TextField
              size="small"
              label="by manufacturer"
              variant="outlined"
              {...manufacturerFilter}
            />
          </Grid>
          <Grid item xs={12}>
            <Box p={1}>
              <Button variant="outlined">Reset</Button>
            </Box>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

TableToolbar.propTypes = {
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TableToolbar;
