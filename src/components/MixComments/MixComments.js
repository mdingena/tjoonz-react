import React from 'react';
import CommentForm from './CommentForm';
import Comment, { COMMENT_PROPTYPES } from './Comment';
import PropTypes from 'prop-types';
import styles from './MixComments.module.css';

const MixComments = ({ comments, id }) => (
  <div className={styles.root}>
    <div className={styles.heading}>Comments</div>
    <CommentForm id={id} />
    {comments.map(comment => (
      <Comment key={`comment-${comment.id}`} {...comment} />
    ))}
  </div>
);

MixComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(COMMENT_PROPTYPES)),
  id: PropTypes.number.isRequired
};

export default MixComments;
