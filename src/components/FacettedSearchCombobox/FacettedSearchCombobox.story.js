import React from 'react';
import { ARTISTS } from '../../constants/facettedSearchFacets';
import FacettedSearchCombobox from './FacettedSearchCombobox';

export default {
  title: 'FacettedSearchCombobox',
  component: FacettedSearchCombobox
};

export const withCombobox = () => <FacettedSearchCombobox facet={ARTISTS} />;
