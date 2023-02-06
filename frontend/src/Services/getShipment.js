import axios from 'axios';

export const getShipment = async (id) => {
  const url = `${process.env.REACT_APP_BACKEND}shipment/${id}`;
  return axios({
    method: 'GET',
    url
  })
    .then((resp) => resp.data)
    .catch((error) => error);
};