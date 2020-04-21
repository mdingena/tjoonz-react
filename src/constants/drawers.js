import Icon from '../components/Icon';
import PropTypes from 'prop-types';

export const DRAWER_PROPTYPES = PropTypes.shape({
  KEY: PropTypes.string.isRequired,
  ALIGN: PropTypes.oneOf(['left', 'right']).isRequired,
  CLOSE_TEXT: PropTypes.string.isRequired,
  CLOSE_ICON: PropTypes.func,
  SHOW_PROGRESS: PropTypes.bool,
  TRANSPARENT_OVERLAY: PropTypes.bool
});

export const SEARCH_DRAWER = {
  KEY: 'SEARCH_DRAWER',
  ALIGN: 'left',
  CLOSE_TEXT: 'Close search options',
  CLOSE_ICON: Icon.ArrowLeftBold,
  SHOW_PROGRESS: true
};

export const RESULT_DETAILS_DRAWER = {
  KEY: 'RESULT_DETAILS_DRAWER',
  ALIGN: 'right',
  CLOSE_TEXT: 'Close mix details',
  CLOSE_ICON: Icon.ArrowRightBold,
  TRANSPARENT_OVERLAY: true
};
