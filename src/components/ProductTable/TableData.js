import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHeader from './TableHeader';
import { stableSort, getComparator } from '../../utils/helper';
import { useStyles } from '../../styles';

const TableData = (props) => {
  const { availabilityInfo, tableData, page, rowsPerPage } = props;
  const classes = useStyles();
  const [selected, setSelected] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('availability');

  const handleClick = (name) => {
    setSelected(name);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.rows.length - page * rowsPerPage);

  return (
    <TableContainer className={classes.container}>
      <Table stickyHeader className={classes.table} size="small">
        <TableHeader
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {tableData.status ? (
            <TableRow className={classes.rowHeight}>
              <TableCell align="center" colSpan={5}>
                {tableData.status}
              </TableCell>
            </TableRow>
          ) : (
            stableSort(tableData.rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row.id)}
                    tabIndex={-1}
                    key={row.id}
                    selected={selected === row.id}>
                    <TableCell width="30%" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell width="20%">{row.color.sort().join(', ')}</TableCell>
                    <TableCell width="20%">{row.manufacturer}</TableCell>
                    <TableCell width="10%">{row.price}</TableCell>
                    <TableCell width="20%">
                      {availabilityInfo[row.id] ? (
                        availabilityInfo[row.id]
                      ) : (
                        <CircularProgress className={classes.ml20} size={15} />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
          )}
          {emptyRows > 0 && (
            <TableRow style={{ height: 33 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableData.propTypes = {
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  tableData: PropTypes.object.isRequired,
  availabilityInfo: PropTypes.object.isRequired,
};

export default TableData;
