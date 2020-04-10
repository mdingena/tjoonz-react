import React from 'react';
import FacettedSearchItem from './FacettedSearchItem';

export default {
  title: 'FacettedSearchItem',
  component: FacettedSearchItem
};

export const facettedSearchItem = () => (
  <FacettedSearchItem facet='artists' itemId={42} text='Test 42' count={1234} />
);
