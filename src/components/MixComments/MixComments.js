import React from 'react';
import Comment, { COMMENT_PROPTYPES } from './Comment';
import PropTypes from 'prop-types';
import styles from './MixComments.module.css';

const MixComments = ({ comments }) => comments
  ? (
    <div className={styles.root}>
      <div className={styles.heading}>Comments</div>
      {comments.map(comment => <Comment key={`comment-${comment.id}`} {...comment} />)}
    </div>
  )
  : null;

MixComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(COMMENT_PROPTYPES))
};

export default MixComments;
