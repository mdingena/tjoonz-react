import { QUEUE_MY_COLLECTION } from '../constants/actionTypes';

const queueMyCollection = mixes => ({
  type: QUEUE_MY_COLLECTION,
  payload: { mixes }
});

export default queueMyCollection;
