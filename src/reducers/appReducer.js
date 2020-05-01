import { combineReducers } from 'redux';
import detailsReducer from './detailsReducer';
import drawerReducer from './drawerReducer';
import facettedSearchReducer from './facettedSearchReducer';
import mixReducer from './mixReducer';
import playerReducer from './playerReducer';
import queryReducer from './queryReducer';
import tasksReducer from './tasksReducer';

const appReducer = combineReducers({
  details: detailsReducer,
  drawer: drawerReducer,
  facettedSearch: facettedSearchReducer,
  mix: mixReducer,
  player: playerReducer,
  query: queryReducer,
  tasks: tasksReducer
});

export default appReducer;
