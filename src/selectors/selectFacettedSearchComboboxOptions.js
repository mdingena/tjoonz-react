const selectFacettedSearchComboboxOptions = facet =>
  ({ facettedSearch }) => {
    const { options, selected } = facettedSearch[facet.KEY];
    const comboboxOptions = options.filter(option => selected.every(selection => selection.id !== option.id));

    return comboboxOptions;
  };

export default selectFacettedSearchComboboxOptions;
