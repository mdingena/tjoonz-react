import { BASE_URL, ENDPOINTS } from '../constants/api';

const deleteMyCollectionsMix = (mixId, collectionId, token) => {
  const options = {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mix_id: mixId
    }),
    json: true
  };

  return window.fetch(`${BASE_URL}${ENDPOINTS.MY_COLLECTIONS}/${collectionId}`, options);
};

export default deleteMyCollectionsMix;
