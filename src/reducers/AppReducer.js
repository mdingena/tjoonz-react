import { combineReducers } from 'redux';
import FacettedSearchReducer from './FacettedSearchReducer';
import TasksReducer from './TasksReducer';

const AppReducer = combineReducers({
  facettedSearch: FacettedSearchReducer,
  tasks: TasksReducer
});

export default AppReducer;
