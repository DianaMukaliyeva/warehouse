import { useState, useEffect } from 'react';
import { getStockDescription } from '../utils/helper';
import categories from '../categories';
import services from '../services/badApiService';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    onReset,
  };
};

export const useProductsFromApi = (product) => {
  const [products, setProducts] = useState({});
  const [manufacturers, setManufacturers] = useState([]);
  const [availabilityInfo, setAvailabilityInfo] = useState({});
  const [tableData, setTableData] = useState({ status: 'Loading...', rows: [] });

  useEffect(() => {
    const getAllProductsAndManufacturers = async () => {
      let allProducts = {};
      let allManufacturers = new Set();
      for (const category of categories) {
        const data = await services.getProducts(category.product);
        allProducts[category.product] = data;
        let tempManufacturers = new Set(data.map((item) => item.manufacturer));
        allManufacturers = new Set([...allManufacturers, ...tempManufacturers]);

        if (product === category.product) {
          setTableData({ status: '', rows: data });
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
        const data = await services.getAvailability(manufacturers[i]);
        if (data && data.response && data.response !== '[]') {
          data.response.forEach(
            (info) =>
              (allAvailability[[info.id.toLowerCase()]] = getStockDescription(info.DATAPAYLOAD))
          );
        } else if (data.response === '[]' && attempts < 15) {
          i--;
          attempts++;
        }
      }
      setAvailabilityInfo(allAvailability);
    };
    getAvailability();
    setTimeout(() => {
      getAvailability();
    }, 1000 * 60 * 5);
  }, [manufacturers]);

  return [{ products, manufacturers, availabilityInfo, tableData }, setTableData];
};
