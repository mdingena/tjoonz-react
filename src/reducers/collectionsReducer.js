import {
  APPEND_MY_COLLECTIONS_MIXES_RESULTS,
  DELETE_MIX_FROM_MY_COLLECTION,
  DONE_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE,
  DONE_FETCHING_MY_COLLECTIONS_RESULTS,
  SET_MY_COLLECTIONS_CURRENT,
  SET_MY_COLLECTIONS_RESULTS,
  START_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE,
  START_FETCHING_MY_COLLECTIONS_RESULTS
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  collections: [],
  current: {},
  mixes: [],
  statusText: null,
  nextPage: 1
};

const collectionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case APPEND_MY_COLLECTIONS_MIXES_RESULTS:
      return {
        ...state,
        mixes: [...state.mixes, ...payload.results]
      };

    case DELETE_MIX_FROM_MY_COLLECTION:
      const deleteFromCollectionIndex = state.collections.findIndex(({ id }) => id === payload.collectionId);

      return deleteFromCollectionIndex && state.current.id === payload.collectionId
        ? {
            ...state,
            collections: [
              ...state.collections.slice(0, deleteFromCollectionIndex),
              {
                ...state.collections[deleteFromCollectionIndex],
                count: Number(state.collections[deleteFromCollectionIndex].count) - 1,
                mixes: state.collections[deleteFromCollectionIndex].mixes.filter(id => id !== payload.mixId)
              },
              ...state.collections.slice(deleteFromCollectionIndex + 1)
            ],
            current: {
              ...state.current,
              count: Number(state.current.count) - 1,
              mixes: state.current.mixes.filter(id => id !== payload.mixId)
            },
            mixes: state.mixes.filter(({ id }) => id !== payload.mixId)
          }
        : state;

    case DONE_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE:
      return {
        ...state,
        isFetching: false,
        statusText: payload.statusText,
        nextPage: payload.nextPage
      };

    case DONE_FETCHING_MY_COLLECTIONS_RESULTS:
      return {
        ...state,
        isFetching: false,
        statusText: payload.statusText
      };

    case SET_MY_COLLECTIONS_CURRENT:
      return {
        ...state,
        current: state.collections.find(({ id }) => id === payload.id) || {},
        nextPage: 1
      };

    case SET_MY_COLLECTIONS_RESULTS:
      return {
        ...state,
        collections: payload.results,
        current: payload.results[0] || {},
        mixes: [],
        nextPage: 1
      };

    case START_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE:
      return {
        ...state,
        isFetching: true,
        mixes: state.nextPage === 1 ? [] : state.mixes
      };

    case START_FETCHING_MY_COLLECTIONS_RESULTS:
      return {
        ...state,
        isFetching: true
      };

    default:
      return state;
  }
};

export default collectionsReducer;
