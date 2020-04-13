import PropTypes from 'prop-types';

export const FACET_PROPTYPES = PropTypes.shape({
  KEY: PropTypes.string.isRequired,
  ENDPOINT: PropTypes.string.isRequired,
  NAME_SINGULAR: PropTypes.string.isRequired,
  NAME_PLURAL: PropTypes.string.isRequired
});

export const ARTISTS = {
  KEY: 'ARTISTS',
  ENDPOINT: '/artist',
  NAME_SINGULAR: 'artist',
  NAME_PLURAL: 'artists'
};

export const GENRES = {
  KEY: 'GENRES',
  ENDPOINT: '/genre',
  NAME_SINGULAR: 'genre',
  NAME_PLURAL: 'genres'
};

export const TAGS = {
  KEY: 'TAGS',
  ENDPOINT: '/tags',
  NAME_SINGULAR: 'tag',
  NAME_PLURAL: 'tags'
};
