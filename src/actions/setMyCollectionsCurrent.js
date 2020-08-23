import { SET_MY_COLLECTIONS_CURRENT } from '../constants/actionTypes';
import fetchMyCollectionsMixes from './fetchMyCollectionsMixes';

const setMyCollectionsCurrent = id => dispatch => {
  dispatch({
    type: SET_MY_COLLECTIONS_CURRENT,
    payload: { id }
  });

  dispatch(fetchMyCollectionsMixes());
};

export default setMyCollectionsCurrent;
