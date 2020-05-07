import { PREPEND_COMMENT } from '../constants/actionTypes';

const prependComment = comment => ({
  type: PREPEND_COMMENT,
  payload: { comment }
});

export default prependComment;
