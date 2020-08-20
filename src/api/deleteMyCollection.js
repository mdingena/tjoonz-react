import { BASE_URL, ENDPOINTS } from '../constants/api';

const deleteMyCollection = (collectionId, token) => {
  const options = {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      collection_id: collectionId
    }),
    json: true
  };

  return window.fetch(`${BASE_URL}${ENDPOINTS.MY_COLLECTIONS}`, options);
};

export default deleteMyCollection;
