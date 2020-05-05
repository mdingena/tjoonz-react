import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Comment.module.css';

const Comment = ({
  authorName,
  authorAvatar,
  published,
  content
}) => {
  const avatarRef = useRef();
  const [avatarRevealed, revealAvatar] = useState(false);

  const handleAvatarLoaded = () => revealAvatar(true);

  useEffect(() => {
    revealAvatar(false);
  }, [authorAvatar]);

  useEffect(() => {
    if (!avatarRevealed && avatarRef.current && avatarRef.current.complete) handleAvatarLoaded();
  });

  return (
    <div className={styles.root}>
      <img
        ref={avatarRef}
        key={authorAvatar}
        className={avatarRevealed ? styles.avatarRevealed : styles.avatarLoading}
        src={authorAvatar}
        alt={authorName}
        onLoad={handleAvatarLoaded}
      />
      <div className={styles.comment}>
        <div className={styles.heading}>
          <span className={styles.date}>{published}</span>
          {authorName}
        </div>
        <div className={styles.body} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export const COMMENT_PROPTYPES = {
  id: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired
};

Comment.propTypes = COMMENT_PROPTYPES;

export default Comment;
