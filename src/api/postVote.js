import { BASE_URL, ENDPOINTS } from '../constants/api';

const postVote = (liked, id, token) => {
  const endpoint = liked ? ENDPOINTS.UPVOTE : ENDPOINTS.DOWNVOTE;

  const options = {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    json: true
  };

  return window.fetch(`${BASE_URL}${endpoint}/${id}`, options);
};

export default postVote;
