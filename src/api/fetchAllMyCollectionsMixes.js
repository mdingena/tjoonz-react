import { ENDPOINTS } from '../constants/api';
import addTasks from '../actions/addTasks';
import completeTasks from '../actions/completeTasks';
import fetchPage from './fetchPage';

const fetchAllMyCollectionsMixes = async (dispatch, id, options = {}) => {
  dispatch(addTasks(`fetchAllMyCollectionsMixes_${id}`, 1));

  let firstPage = true;
  let ok = true;
  let page = 1;
  let pageCount = 0;
  let resources = [];
  let statusText = null;

  do {
    const response = await fetchPage(ENDPOINTS.MIXES, page, options);
    ok = response.ok;

    if (ok) {
      pageCount = response.pageCount;
      resources = [...resources, ...response.resources];

      if (firstPage && pageCount > 1) dispatch(addTasks(`fetchAllMyCollectionsMixes_${id}`, pageCount - 1));

      dispatch(completeTasks(`fetchAllMyCollectionsMixes_${id}`, 1));
      firstPage = false;
    } else {
      statusText = response.statusText;
    }
  } while (ok && pageCount > page++);

  return { ok, resources, pageCount, statusText };
};

export default fetchAllMyCollectionsMixes;
