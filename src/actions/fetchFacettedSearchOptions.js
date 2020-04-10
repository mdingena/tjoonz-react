import {
  DONE_FETCHING_FACETTED_SEARCH_OPTIONS,
  SET_FACETTED_SEARCH_OPTIONS,
  START_FETCHING_FACETTED_SEARCH_OPTIONS
} from '../constants/actionTypes';
import fetchAllFacetPages from '../api/fetchAllFacetPages';

const fetchFacettedSearchOptions = facet => async dispatch => {
  dispatch(startFetching(facet));

  const response = await fetchAllFacetPages(facet);

  if (!response.ok) {
    dispatch(doneFetching(facet, response.statusText));
    return;
  }

  const options = response.resources.map(({ id, name: text, count }) => ({ id, text, count }));

  dispatch(setFacettedSearchOptions(facet, options));
  dispatch(doneFetching(facet));
};

export default fetchFacettedSearchOptions;

const startFetching = facet => ({
  type: START_FETCHING_FACETTED_SEARCH_OPTIONS,
  payload: { facet }
});

const doneFetching = (facet, statusText = null) => ({
  type: DONE_FETCHING_FACETTED_SEARCH_OPTIONS,
  payload: { facet, statusText }
});

const setFacettedSearchOptions = (facet, options) => ({
  type: SET_FACETTED_SEARCH_OPTIONS,
  payload: { facet, options }
});
