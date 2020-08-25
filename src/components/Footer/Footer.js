import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = ({ links }) => (
  <footer className={styles.root}>
    <ul className={styles.list}>
      {/* links.map(({ to, text }) => (
        <li key={to}>
          <Link className={styles.link} to={to}>
            {text}
          </Link>
        </li>
      )) */}
      <li>
        {/* eslint-disable react/jsx-no-target-blank */}
        <a className={styles.link} href='https://www.tjoonz.com/system/wp-admin/profile.php' target='_blank'>
          Manage Profile
        </a>
        {/* eslint-enable react/jsx-no-target-blank */}
      </li>
    </ul>
    <p>Tjoonz.com est. 2008</p>
  </footer>
);

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          pathname: PropTypes.string.isRequired,
          state: PropTypes.shape({
            from: PropTypes.string.isRequired
          })
        })
      ]),
      text: PropTypes.string.isRequired
    })
  )
};

export default Footer;
