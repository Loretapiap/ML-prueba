import axios from 'axios';

export const getPayment = async (id) => {
  const url = `${process.env.REACT_APP_BACKEND}payment/${id}`;
  return axios({
    method: 'GET',
    url
  })
    .then((resp) => resp.data)
    .catch((error) => error);
};