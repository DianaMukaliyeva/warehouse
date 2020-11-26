import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, TablePagination } from '@material-ui/core';
import TableFilter from './TableFilter';
import TableData from './TableData';
import services from '../services/badApiService';
import categories from '../categories';
import { getStockDescription } from '../utils/helper';
import { useStyles } from '../styles';

const Products = () => {
  const classes = useStyles();
  const { product } = useParams();
  const [tableData, setTableData] = useState({ status: 'Loading...', rows: [] });
  const [products, setProducts] = useState({});
  const [manufacturers, setManufacturers] = useState([]);
  const [availabilityInfo, setAvailabilityInfo] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    const getAllProductsAndManufacturers = async () => {
      let allProducts = {};
      let allManufacturers = new Set();
      for (const category of categories) {
        try {
          const data = await services.getProducts(category.product);
          allProducts[category.product] = data;
          let tempManufacturers = new Set(data.map((item) => item.manufacturer));
          allManufacturers = new Set([...allManufacturers, ...tempManufacturers]);

          if (product === category.product) {
            setTableData({ status: '', rows: data });
          }
        } catch (error) {
          console.log(error);
        }
      }
      setProducts(allProducts);
      setManufacturers([...allManufacturers]);
    };

    getAllProductsAndManufacturers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getAvailability = async () => {
      let allAvailability = {};
      let attempts = 0;
      for (let i = 0; i < manufacturers.length; i++) {
        try {
          const data = await services.getAvailability(manufacturers[i]);
          if (data && data.response && data.response !== '[]') {
            data.response.forEach(
              (info) =>
                (allAvailability[[info.id.toLowerCase()]] = getStockDescription(info.DATAPAYLOAD))
            );
          } else if (data.response === '[]' && attempts < 10) {
            i--;
            attempts++;
          }
        } catch (err) {
          console.log(err);
        }
      }
      setAvailabilityInfo(allAvailability);
    };
    getAvailability();
  }, [manufacturers]);

  useEffect(() => {
    const updateInformation = async () => {
      try {
        const data = await services.getProducts(product);
        setProducts({ ...products, [product]: data });
        let tempManufacturers = new Set(data.map((item) => item.manufacturer));
        setManufacturers([...tempManufacturers]);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setTableData({ ...tableData, status: 'No such category' });
        } else {
          setTableData({ ...tableData, status: 'Refresh the page or try later. Server is down' });
        }
      }
    };

    if (products[[product]]) {
      setTableData({ status: '', rows: products[[product]] });
    }

    updateInformation();
  }, [product]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className={classes.paper}>
      <TableFilter />
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

export default Products;
