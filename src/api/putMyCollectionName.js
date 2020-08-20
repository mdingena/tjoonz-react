import { BASE_URL, ENDPOINTS } from '../constants/api';

const putMyCollectionName = (id, name, token) => {
  const options = {
    method: 'put',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      collection_name: name
    }),
    json: true
  };

  return window.fetch(`${BASE_URL}${ENDPOINTS.MY_COLLECTIONS}/${id}`, options);
};

export default putMyCollectionName;
