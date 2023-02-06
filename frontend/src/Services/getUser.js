import axios from 'axios';

export const getUser = async () => {
  const url = `${process.env.REACT_APP_BACKEND}user`;
  return axios({
    method: 'GET',
    url
  })
    .then((resp) => resp.data)
    .catch((error) => error);
};