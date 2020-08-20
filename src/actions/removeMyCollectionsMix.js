import { DELETE_MIX_FROM_MY_COLLECTION } from '../constants/actionTypes';
import addTasks from './addTasks';
import completeTasks from './completeTasks';
import deleteMyCollectionsMix from '../api/deleteMyCollectionsMix';

const removeMyCollectionsMix = (mixId, collectionId) => async (dispatch, getState) => {
  dispatch(addTasks(DELETE_MIX_FROM_MY_COLLECTION, 1));

  dispatch({
    type: DELETE_MIX_FROM_MY_COLLECTION,
    payload: { mixId, collectionId }
  });

  const {
    auth: { token }
  } = getState();

  const response = await deleteMyCollectionsMix(mixId, collectionId, token);

  if (!response.ok) {
    dispatch(completeTasks(DELETE_MIX_FROM_MY_COLLECTION, 1));
    return;
  }

  const result = await response.json();

  if (!result.success) {
    dispatch(completeTasks(DELETE_MIX_FROM_MY_COLLECTION, 1));
    return;
  }

  dispatch(completeTasks(DELETE_MIX_FROM_MY_COLLECTION, 1));
};

export default removeMyCollectionsMix;
