import { combineReducers } from 'redux';
import { FacettedSearchReducer } from './FacettedSearchReducer';

export const AppReducer = combineReducers({
  facettedSearch: FacettedSearchReducer
});
