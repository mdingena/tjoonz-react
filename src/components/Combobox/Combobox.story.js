import React from 'react';
import Combobox from './Combobox';
import selectFacettedSearchComboboxOptions from '../../selectors/selectFacettedSearchComboboxOptions';
import { ARTISTS } from '../../constants/facettedSearchFacets';

export default {
  title: 'Combobox',
  component: Combobox
};

export const combobox = () => (
  <Combobox
    placeholder='Search artists'
    onSelect={selectedItem => console.log(`Selected ${selectedItem.text}`)}
    optionsSelector={selectFacettedSearchComboboxOptions(ARTISTS)}
  />
);
