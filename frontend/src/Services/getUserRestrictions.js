import axios from 'axios';

export const getUserRestrictions = async (id) => {
  const url = `${process.env.REACT_APP_BACKEND}restrictions/${id}`;
  return axios({
    method: 'GET',
    url
  })
    .then((resp) => resp.data)
    .catch((error) => error);
};