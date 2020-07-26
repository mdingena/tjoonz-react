import React from 'react';
import { GENRES } from '../../constants/facettedSearchFacets';
import FacettedSearchList from './FacettedSearchList';

export default {
  title: 'FacettedSearchList',
  component: FacettedSearchList
};

export const withPreview = () => <FacettedSearchList facet={GENRES} previewCount={10} />;
