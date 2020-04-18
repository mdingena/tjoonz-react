import Icon from '../components/Icon';
import PropTypes from 'prop-types';

export const DRAWER_PROPTYPES = {
  ALIGN: PropTypes.oneOf(['left', 'right']).isRequired,
  CLOSE_TEXT: PropTypes.string.isRequired,
  CLOSE_ICON: PropTypes.func
};

export const SEARCH_DRAWER = {
  ALIGN: 'left',
  CLOSE_TEXT: 'Close search options',
  CLOSE_ICON: Icon.ArrowLeftBold
};
