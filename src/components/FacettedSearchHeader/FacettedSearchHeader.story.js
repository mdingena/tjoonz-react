import React from 'react';
import { GENRES } from '../../constants/facettedSearchFacets';
import FacettedSearchHeader from './FacettedSearchHeader';

export default {
  title: 'FacettedSearchHeader',
  component: FacettedSearchHeader
};

export const facettedSearchHeader = () => (
  <FacettedSearchHeader facet={GENRES} />
);
