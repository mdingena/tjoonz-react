import { BASE_URL, ENDPOINTS } from '../constants/api';

const postMyCollectionsMix = (mixId, collectionId, collectionName, token) => {
  const options = {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mix_id: mixId
    }),
    json: true
  };

  if (collectionId === 0) options.body.collection_name = collectionName;

  console.log(options);

  return window.fetch(`${BASE_URL}${ENDPOINTS.POST_MY_COLLECTIONS_MIX}/${collectionId}`, options);
};

export default postMyCollectionsMix;
