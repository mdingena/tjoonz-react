import React from 'react';
import { ARTISTS, GENRES } from '../../constants/facettedSearchFacets';
import FacettedSearch from './FacettedSearch';

export default {
  title: 'FacettedSearch',
  component: FacettedSearch
};

export const withCombobox = () => (
  <FacettedSearch facet={ARTISTS} showCombobox />
);

export const withPreview = () => (
  <FacettedSearch facet={GENRES} previewCount={10} />
);
