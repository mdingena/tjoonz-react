import { combineReducers } from 'redux';
import facettedSearchReducer from './facettedSearchReducer';
import tasksReducer from './tasksReducer';

const appReducer = combineReducers({
  facettedSearch: facettedSearchReducer,
  tasks: tasksReducer
});

export default appReducer;
