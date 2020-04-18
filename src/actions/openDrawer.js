import { OPEN_DRAWER } from '../constants/actionTypes';

const openDrawer = drawer => ({
  type: OPEN_DRAWER,
  payload: { drawer }
});

export default openDrawer;
