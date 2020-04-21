import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';
import facettedSearchReducer from './facettedSearchReducer';
import queryReducer from './queryReducer';
import tasksReducer from './tasksReducer';

const appReducer = combineReducers({
  drawer: drawerReducer,
  facettedSearch: facettedSearchReducer,
  query: queryReducer,
  tasks: tasksReducer
});

export default appReducer;
