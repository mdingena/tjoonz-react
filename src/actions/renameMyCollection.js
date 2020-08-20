import { RENAME_MY_COLLECTION } from '../constants/actionTypes';
import addTasks from './addTasks';
import completeTasks from './completeTasks';
import putMyCollectionName from '../api/putMyCollectionName';

const renameMyCollection = (id, name) => async (dispatch, getState) => {
  dispatch(addTasks(RENAME_MY_COLLECTION, 1));

  const truncatedName = name.substr(0, 255);

  dispatch({
    type: RENAME_MY_COLLECTION,
    payload: {
      id,
      name: truncatedName
    }
  });

  const {
    auth: { token }
  } = getState();

  const response = await putMyCollectionName(id, truncatedName, token);

  if (!response.ok) {
    dispatch(completeTasks(RENAME_MY_COLLECTION, 1));
    return;
  }

  const result = await response.json();

  if (!result.success) {
    dispatch(completeTasks(RENAME_MY_COLLECTION, 1));
    return;
  }

  dispatch(completeTasks(RENAME_MY_COLLECTION, 1));
};

export default renameMyCollection;
