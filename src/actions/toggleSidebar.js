import { TOGGLE_SIDEBAR } from '../constants/actionTypes';

const toggleSidebar = key => ({
  type: TOGGLE_SIDEBAR,
  payload: { key }
});

export default toggleSidebar;
