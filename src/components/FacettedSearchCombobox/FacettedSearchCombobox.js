import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectFacettedSearchFacet from '../../selectors/selectFacettedSearchFacet';
import { FACETTED_SEARCH_OPTIONS_TTL } from '../../constants/api';
import { FACET_PROPTYPES } from '../../constants/facettedSearchFacets';
import fetchFacettedSearchOptions from '../../actions/fetchFacettedSearchOptions';
import toggleFacettedSearchItem from '../../actions/toggleFacettedSearchItem';
import { useCombobox } from 'downshift';
import he from 'he';
import FacettedSearchHeader from '../FacettedSearchHeader';
import FacettedSearchItem from '../FacettedSearchItem';
import styles from './FacettedSearchCombobox.module.css';

const FacettedSearchCombobox = ({ facet }) => {
  const dispatch = useDispatch();
  const { isFetching, lastUpdated, options, selected } = useSelector(selectFacettedSearchFacet(facet));

  useEffect(() => {
    const updateRequired = lastUpdated < Date.now() - FACETTED_SEARCH_OPTIONS_TTL;

    if (updateRequired) {
      dispatch(fetchFacettedSearchOptions(facet));
    }
  }, [facet, lastUpdated, dispatch]);

  const [comboboxItems, setComboboxItems] = useState(options);
  const handleComboboxChange = ({ inputValue }) => {
    const filteredItems = options
      .filter(({ text }) => text.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 30);
    setComboboxItems(filteredItems);
  };

  const [comboboxSelection, setComboboxSelection] = useState(null);
  const handleComboboxSelection = ({ selectedItem }) => {
    setComboboxSelection(selectedItem);
  };

  useEffect(() => {
    if (comboboxSelection !== null) {
      const action = toggleFacettedSearchItem(facet, comboboxSelection);
      dispatch(action);
    }
  }, [comboboxSelection, facet, dispatch]);

  const {
    isOpen: menuIsOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps
  } = useCombobox({
    items: comboboxItems,
    onInputValueChange: handleComboboxChange,
    onSelectedItemChange: handleComboboxSelection,
    itemToString: () => ''
  });

  return (
    <div className={styles.root}>
      <FacettedSearchHeader facet={facet} />
      <div className={styles.combobox}>
        <div {...getComboboxProps()}>
          <input
            className={styles.input}
            placeholder={`${isFetching ? 'Loading' : 'Search'} ${facet.NAME_PLURAL}`}
            disabled={isFetching}
            {...getInputProps()}
          />
        </div>
        <div className={styles.list} {...getMenuProps()}>
          {!isFetching &&
            menuIsOpen &&
            comboboxItems.map((item, index) => (
              <div
                key={item.id}
                className={highlightedIndex === index ? styles.highlighted : styles.item}
                {...getItemProps({ item, index })}
              >
                <span className={styles.text}>{he.decode(item.text)}</span>
                <span className={styles.count}>{item.count.toLocaleString()}</span>
              </div>
            ))}
        </div>
      </div>
      {selected.map((item, index) => (
        <FacettedSearchItem key={`option-${index}`} facet={facet} item={item} />
      ))}
    </div>
  );
};

FacettedSearchCombobox.propTypes = {
  facet: FACET_PROPTYPES
};

export default FacettedSearchCombobox;
