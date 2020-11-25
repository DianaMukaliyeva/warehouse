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
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  // const [rows, setRows] = React.useState([]);
  const [products, setProducts] = React.useState({});
  // const [status, setStatus] = React.useState('Loading...');
  const [complex, setComplex] = React.useState({
    status: 'Loading...',
    rows: [],
    products: {},
    manufacturers: [],
    availability: [],
  });
  const [manufacturers, setManufacturers] = React.useState([]);
  const [availabilityInfo, setAvailabilityInfo] = React.useState([]);

  useEffect(() => {
    console.log('use1');

    const fetchProducts = async () => {
      if (!categories.some((e) => e.product === product)) {
        setComplex({ ...complex, status: 'No such category' });
        // setStatus('No such category');
      }
      let allProducts = {};
      let allManufacturers = new Set();
      let rows = [];
      for (const category of categories) {
        try {
          const res = await axios.get(
            `https://bad-api-assignment.reaktor.com/products/${category.product}`
          );
          allProducts[category.product] = res.data;
          let tempManufacturers = new Set(res.data.map((item) => item.manufacturer));
          allManufacturers = new Set([...allManufacturers, ...tempManufacturers]);
          if (product === category.product) {
            rows = res.data;
            // setStatus('');
            // setRows(res.data);
          }
        } catch (err) {
          if (err.response && err.response.status === 404) {
            setComplex({ ...complex, status: 'No such category' });
            // setStatus('No such category');
          } else {
            setComplex({ ...complex, status: 'Refresh the page' });
            // setStatus('Refresh the page');
          }
        }
      }
      setComplex({
        ...complex,
        status: '',
        rows: rows,
        products: allProducts,
        manufacturers: allManufacturers,
      });
      // setProducts(allProducts);
      // setManufacturers(allManufacturers);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('use 2');
    if (complex.products[[product]]) {
      console.log('in use 2');
      setComplex({ ...complex, rows: complex.products[[product]] });
      // setStatus('');
      // setRows(products[[product]]);
    }
    //get the latest information
  }, [product]);

  // useEffect(() => {
  //   console.log('use eff');
  //   const fetchAvailability = async () => {
  //     const resultAvailability = await services.getAvailability(manufacturers);
  //     console.log('resutl ava', resultAvailability);
  //     setAvailabilityInfo(resultAvailability);
  //     let newRows = [...rows];
  //     if (resultAvailability.length > 0) {
  //       newRows = newRows.map((item) => {
  //         let newItem = { ...item };
  //         let found = resultAvailability.find((el) => el.id.toLowerCase() === item.id);
  //         newItem.availability = found.DATAPAYLOAD;
  //         return newItem;
  //       });
  //       setRows(newRows);
  //     }
  //   };
  //   fetchAvailability();
  //   console.log(
  //     'after',
  //     rows.filter((f) => f.name === 'EWHHOP ROOM')
  //   );
  // }, [manufacturers]);

  console.log('rerender', complex.rows.length);

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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, complex.rows.length - page * rowsPerPage);

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
            {complex.status ? (
              <TableRow className={classes.rowHeight}>
                <TableCell align="center" colSpan={5}>
                  {complex.status}
                </TableCell>
              </TableRow>
            ) : (
              stableSort(complex.rows, getComparator(order, orderBy))
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
                        {row.availability ? row.availability : 'loading...'}
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
        count={complex.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default Products;
