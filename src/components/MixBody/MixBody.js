import React from 'react';
import PropTypes from 'prop-types';
import styles from './MixBody.module.css';

const MixBody = ({ content }) => content
  ? <div className={styles.root} dangerouslySetInnerHTML={{ __html: content }} />
  : null;

MixBody.propTypes = {
  content: PropTypes.string
};

export default MixBody;
