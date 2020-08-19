import { BASE_URL, ENDPOINTS } from '../constants/api';

const getMyCollections = token => {
  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    json: true
  };

  return window.fetch(`${BASE_URL}${ENDPOINTS.MY_COLLECTIONS}`, options);
};

export default getMyCollections;
