import { REMOVE_PLAYLIST_ITEMS } from '../constants/actionTypes';

const removePlaylistItems = items => ({
  type: REMOVE_PLAYLIST_ITEMS,
  payload: { items }
});

export default removePlaylistItems;
