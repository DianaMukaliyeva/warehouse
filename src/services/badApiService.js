import axios from 'axios';
const services = {};
const baseUrl = 'https://bad-api-assignment.reaktor.com/';

services.getAvailability = async (manufacturer) => {
  const res = await axios.get(`${baseUrl}availability/${manufacturer}`, {
    headers: {
      // 'x-force-error-mode': 'all',
    },
  });
  return res.data;
};

services.getProducts = async (product) => {
  const res = await axios.get(`${baseUrl}products/${product}`);

  return res.data;
};

export default services;
