import { APPEND_PLAYLIST_ITEMS } from '../constants/actionTypes';

const appendPlaylistItems = ids => (dispatch, getState) => {
  const { query, mix } = getState();

  const cache = [...query.results.filter(item => item.id !== mix.current.id), mix.current];

  const items = cache.filter(item => ids.includes(item.id));

  dispatch({
    type: APPEND_PLAYLIST_ITEMS,
    payload: { items }
  });
};

export default appendPlaylistItems;
