import { combineReducers } from 'redux';
import detailsReducer from './detailsReducer';
import drawerReducer from './drawerReducer';
import facettedSearchReducer from './facettedSearchReducer';
import playerReducer from './playerReducer';
import queryReducer from './queryReducer';
import tasksReducer from './tasksReducer';

const appReducer = combineReducers({
  details: detailsReducer,
  drawer: drawerReducer,
  facettedSearch: facettedSearchReducer,
  player: playerReducer,
  query: queryReducer,
  tasks: tasksReducer
});

export default appReducer;
