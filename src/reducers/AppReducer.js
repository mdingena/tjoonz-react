import { combineReducers } from 'redux';
import FacettedSearchReducer from './FacettedSearchReducer';

const AppReducer = combineReducers({
  facettedSearch: FacettedSearchReducer
});

export default AppReducer;
