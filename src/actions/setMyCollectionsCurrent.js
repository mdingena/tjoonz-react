import { SET_MY_COLLECTIONS_CURRENT } from '../constants/actionTypes';
import fetchMyCollectionsMixesNextPage from './fetchMyCollectionsMixesNextPage';

const setMyCollectionsCurrent = id => dispatch => {
  dispatch({
    type: SET_MY_COLLECTIONS_CURRENT,
    payload: { id }
  });

  dispatch(fetchMyCollectionsMixesNextPage());
};

export default setMyCollectionsCurrent;
