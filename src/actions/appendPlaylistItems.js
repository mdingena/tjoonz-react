import { APPEND_PLAYLIST_ITEMS } from '../constants/actionTypes';

const appendPlaylistItems = ids => (dispatch, getState) => {
  const { query } = getState();

  const items = query.results.filter(item => ids.includes(item.id));

  dispatch({
    type: APPEND_PLAYLIST_ITEMS,
    payload: { items }
  });
};

export default appendPlaylistItems;
