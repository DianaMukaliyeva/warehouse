import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, TablePagination } from '@material-ui/core';
import TableToolbar from './TableToolbar';
import TableData from './TableData';
import { useField, useProductsFromApi } from '../../hooks';
import { useStyles } from '../../styles';

const ProductTable = () => {
  const classes = useStyles();
  const { product } = useParams();
  const [{ products, availabilityInfo, tableData }, setTableData] = useProductsFromApi(product);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const nameFilter = useField('search');
  const manufacturerFilter = useField('search');
  const colorFilter = useField('search');

  const filterRows = (rows) => {
    return rows.filter(
      (item) =>
        item.name.toLowerCase().includes(nameFilter.value.toLowerCase()) &&
        item.color.join('').toLowerCase().includes(colorFilter.value.toLowerCase()) &&
        item.manufacturer.toLowerCase().includes(manufacturerFilter.value.toLowerCase())
    );
  };

  useEffect(() => {
    if (products[[product]]) {
      setTableData({ status: '', rows: filterRows(products[[product]]) });
    }
  }, [product]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (products[[product]]) {
      let rowsTemp = products[[product]];
      setTableData({ ...tableData, rows: filterRows(rowsTemp) });
      setPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameFilter.value, manufacturerFilter.value, colorFilter.value]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className={classes.paper}>
      <TableToolbar
        colorFilter={colorFilter}
        manufacturerFilter={manufacturerFilter}
        nameFilter={nameFilter}
      />
      <TableData
        availabilityInfo={availabilityInfo}
        tableData={tableData}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={tableData.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductTable;
