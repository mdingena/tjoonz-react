import { BASE_URL, ENDPOINTS } from '../constants/api';

const postComment = (comment, id, token) => {
  const query = {
    content: comment,
    post: id
  };

  const options = {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query),
    json: true
  };

  return window.fetch(`${BASE_URL}${ENDPOINTS.COMMENTS}`, options);
};

export default postComment;
