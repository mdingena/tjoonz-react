import React from 'react';
import { ARTISTS } from '../../constants/facettedSearchFacets';
import FacettedSearchItem from './FacettedSearchItem';

export default {
  title: 'FacettedSearchItem',
  component: FacettedSearchItem
};

export const facettedSearchItem = () => (
  <FacettedSearchItem facet={ARTISTS} itemId={42} text='Test 42' count={1234} />
);
