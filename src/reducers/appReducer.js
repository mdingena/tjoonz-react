import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';
import facettedSearchReducer from './facettedSearchReducer';
import tasksReducer from './tasksReducer';

const appReducer = combineReducers({
  drawer: drawerReducer,
  facettedSearch: facettedSearchReducer,
  tasks: tasksReducer
});

export default appReducer;
