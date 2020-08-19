import { BASE_URL, ENDPOINTS } from '../constants/api';

const postMyCollectionsMix = (mixId, collectionId, collectionName, token) => {
  const body = {
    mix_id: mixId
  };

  if (collectionId === 0) body.collection_name = collectionName;

  const options = {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    json: true
  };

  return window.fetch(`${BASE_URL}${ENDPOINTS.MY_COLLECTIONS}/${collectionId}`, options);
};

export default postMyCollectionsMix;
