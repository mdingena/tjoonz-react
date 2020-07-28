import { UPSERT_MIX_IN_QUERY_RESULTS } from '../constants/actionTypes';
import setDetails from './setDetails';

const upsertMixInQuery = mix => dispatch => {
  dispatch(upsertMix(mix));
  dispatch(setDetails(mix.id));
};

export default upsertMixInQuery;

const upsertMix = mix => ({
  type: UPSERT_MIX_IN_QUERY_RESULTS,
  payload: { mix }
});
