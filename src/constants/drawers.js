import Icon from '../components/Icon';
import PropTypes from 'prop-types';

export const DRAWER_PROPTYPES = {
  KEY: PropTypes.string.isRequired,
  ALIGN: PropTypes.oneOf(['left', 'right']).isRequired,
  CLOSE_TEXT: PropTypes.string.isRequired,
  CLOSE_ICON: PropTypes.func
};

export const SEARCH_DRAWER = {
  KEY: 'SEARCH_DRAWER',
  ALIGN: 'left',
  CLOSE_TEXT: 'Close search options',
  CLOSE_ICON: Icon.ArrowLeftBold
};

export const RESULT_DETAILS_DRAWER = {
  KEY: 'RESULT_DETAILS_DRAWER',
  ALIGN: 'right',
  CLOSE_TEXT: 'Close mix details',
  CLOSE_ICON: Icon.ArrowRightBold
};
