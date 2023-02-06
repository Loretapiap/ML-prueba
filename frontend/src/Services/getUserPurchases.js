import axios from 'axios';

export const getUserPurchases = async (id, limit) => {
  const url = `${process.env.REACT_APP_BACKEND}user-purchases/${id}${limit ? `?limit=${limit}&offset=0` : ''}`;
  return axios({
    method: 'GET',
    url
  })
    .then((resp) => resp.data)
    .catch((error) => error.response);
};