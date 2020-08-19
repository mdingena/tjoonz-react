import { combineReducers } from 'redux';
import authReducer from './authReducer';
import commentReducer from './commentReducer';
import detailsReducer from './detailsReducer';
import drawerReducer from './drawerReducer';
import facettedSearchReducer from './facettedSearchReducer';
import mixReducer from './mixReducer';
import playerReducer from './playerReducer';
import collectionsReducer from './collectionsReducer';
import queryReducer from './queryReducer';
import tasksReducer from './tasksReducer';

const appReducer = combineReducers({
  auth: authReducer,
  collections: collectionsReducer,
  comment: commentReducer,
  details: detailsReducer,
  drawer: drawerReducer,
  facettedSearch: facettedSearchReducer,
  mix: mixReducer,
  player: playerReducer,
  query: queryReducer,
  tasks: tasksReducer
});

export default appReducer;
