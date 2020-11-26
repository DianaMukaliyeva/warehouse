import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useStyles } from '../styles';
import services from '../services/badApiService';
import categories from '../categories';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'color', label: 'Color' },
  { id: 'manufacturer', label: 'Manufacturer' },
  { id: 'price', label: 'Price' },
  { id: 'availability', label: 'Availability' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};
const EnhancedTableToolbar = () => {
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

const Products = () => {
  const classes = useStyles();
  const { product } = useParams();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('availability');
  const [selected, setSelected] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [tableData, setTableData] = React.useState({ status: 'Loading...', data: [] });
  const [products, setProducts] = React.useState({});
  const [manufacturers, setManufacturers] = React.useState([]);
  const [availabilityInfo, setAvailabilityInfo] = React.useState({});

  useEffect(() => {
    console.log('use 1');
    const fetchProducts = async () => {
      console.log('fetch products');
      if (!categories.some((e) => e.product === product)) {
        setTableData({ ...tableData, status: 'No such category' });
      }
      let allProducts = {};
      let allManufacturers = new Set();
      for (const category of categories) {
        try {
          const res = await axios.get(
            `https://bad-api-assignment.reaktor.com/products/${category.product}`
          );
          allProducts[category.product] = res.data;
          let tempManufacturers = new Set(res.data.map((item) => item.manufacturer));
          allManufacturers = new Set([...allManufacturers, ...tempManufacturers]);
          if (product === category.product) {
            setTableData({ status: '', data: res.data });
          }
        } catch (err) {
          if (err.response && err.response.status === 404) {
            setTableData({ ...tableData, status: 'No such category' });
          } else {
            setTableData({ ...tableData, status: 'Refresh the page or try later. Server is down' });
          }
        }
      }
      setProducts(allProducts);
      setManufacturers([...allManufacturers]);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('use 2');
    const getStock = (description) => {
      if (description.includes('OUTOFSTOCK')) return 'out of stock';
      if (description.includes('LESSTHAN10')) return 'less than 10';
      return 'in stock';
    };
    const fetchAvailability = async () => {
      console.log('fetch availability');
      let allAvailability = {};
      let attempts = 0;
      for (let i = 0; i < manufacturers.length; i++) {
        try {
          const res = await axios.get(
            `https://bad-api-assignment.reaktor.com/availability/${manufacturers[i]}`
          );
          if (res.data && res.data.response && res.data.response !== '[]') {
            res.data.response.forEach(
              (info) => (allAvailability[[info.id.toLowerCase()]] = getStock(info.DATAPAYLOAD))
            );
          } else if (res.data.response === '[]' && attempts < 10) {
            i--;
            attempts++;
          }
          console.log('availability from ', manufacturers[i]);
        } catch (err) {
          console.log(err);
        }
      }
      setAvailabilityInfo(allAvailability);
    };
    fetchAvailability();
  }, [manufacturers]);

  useEffect(() => {
    console.log('use 3');
    if (products[[product]]) {
      console.log('if products fetched set table');
      setTableData({ status: '', data: products[[product]] });
    }
    const updateInformation = async () => {
      console.log('update information');
      try {
        const res = await axios.get(`https://bad-api-assignment.reaktor.com/products/${product}`);
        setProducts({ ...products, [product]: res.data });
        let tempManufacturers = new Set(res.data.map((item) => item.manufacturer));
        setManufacturers([...tempManufacturers]);
        console.log('information updated');
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setTableData({ ...tableData, status: 'No such category' });
        } else {
          setTableData({ ...tableData, status: 'Refresh the page or try later. Server is down' });
        }
      }
    };
    updateInformation();
  }, [product]);

  console.log('rerender', tableData.data.length);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (name) => {
    setSelected(name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.data.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar />
      <TableContainer className={classes.container}>
        <Table stickyHeader className={classes.table} size="small">
          <EnhancedTableHead
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
              stableSort(tableData.data, getComparator(order, orderBy))
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
                        {availabilityInfo[row.id] ? availabilityInfo[row.id] : 'loading...'}
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
      <TablePagination
        rowsPerPageOptions={[25, 50, 100, 250]}
        component="div"
        count={tableData.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default Products;
