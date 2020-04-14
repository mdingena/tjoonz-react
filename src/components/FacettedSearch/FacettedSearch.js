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
import LoadingSpinner from '../LoadingSpinner';
import ProgressBar from '../ProgressBar';
import Button from '../Button';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import styles from './FacettedSearch.module.css';

const FacettedSearch = ({ facet, previewCount = 10, showCombobox = false }) => {
  const dispatch = useDispatch();
  const {
    isFetching,
    lastUpdated,
    options,
    selected
  } = useSelector(selectFacettedSearchFacet(facet));

  useEffect(() => {
    const updateRequired = lastUpdated < (Date.now() - FACETTED_SEARCH_OPTIONS_TTL);

    if (updateRequired) {
      dispatch(fetchFacettedSearchOptions(facet));
    }
  }, [facet, lastUpdated]);

  const [comboboxItems, setComboboxItems] = useState(options);
  const handleComboboxChange = ({ inputValue }) => {
    const filteredItems = options
      .filter(({ text }) => text.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 30);
    setComboboxItems(filteredItems);
  };

  const handleComboboxSelection = ({ selectedItem }) => {
    const action = toggleFacettedSearchItem(facet, selectedItem);
    dispatch(action);
  };

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
    selectedItem: () => null,
    itemToString: () => ''
  });

  const [isExpanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded(state => !state);

  if (isFetching) {
    return (
      <div className={styles.root}>
        <FacettedSearchHeader facet={facet} />
        {showCombobox && (
          <div className={styles.combobox}>
            <input
              className={styles.input}
              placeholder={`Loading ${facet.NAME_PLURAL}...`}
              aria-label={`Loading ${facet.NAME_PLURAL}...`}
              disabled
            />
          </div>
        )}
        <div className={styles.root}>
          <div className={styles.loading}>
            <div className={styles.spinner}>
              <LoadingSpinner size={32} />
            </div>
            <ProgressBar taskKey={`fetchAllFacetPages_${facet.KEY}`} />
          </div>
        </div>
      </div>
    );
  }

  const listItems = showCombobox
    ? selected
    : [
      ...options.slice(0, previewCount),
      ...options.slice(previewCount).sort((a, b) => a.text > b.text ? 1 : -1)
    ];

  if (showCombobox) {
    return (
      <div className={styles.root}>
        <FacettedSearchHeader facet={facet} />
        <div className={styles.combobox}>
          <div {...getComboboxProps()}>
            <input
              className={styles.input}
              placeholder={`Search ${facet.NAME_PLURAL}`}
              aria-label={`Search ${facet.NAME_PLURAL}`}
              {...getInputProps()}
            />
          </div>
          <div className={styles.list} {...getMenuProps()}>
            {menuIsOpen && (
              comboboxItems.map((item, index) => (
                <div
                  key={item.id}
                  className={highlightedIndex === index ? styles.highlighted : styles.item}
                  {...getItemProps({ item, index })}
                >
                  <span className={styles.text}>{he.decode(item.text)}</span>
                  <span className={styles.count}>{item.count.toLocaleString()}</span>
                </div>
              )))}
          </div>
        </div>
        {listItems
          .map((item, index) => (
            <FacettedSearchItem
              key={`option-${index}`}
              facet={facet}
              item={item}
            />
          ))}
      </div>
    );
  } else {
    return (
      <div className={styles.root}>
        <FacettedSearchHeader facet={facet} />
        {listItems
          .slice(0, previewCount)
          .map((item, index) => (
            <FacettedSearchItem
              key={`option-${index}`}
              facet={facet}
              item={item}
            />
          ))}
        {isExpanded && listItems
          .slice(previewCount)
          .map((item, index) => (
            <FacettedSearchItem
              key={`option-${index + previewCount}`}
              facet={facet}
              item={item}
            />
          ))}
        <Button
          onClick={handleExpandClick}
          text={`Show ${isExpanded ? 'less' : 'all'} ${facet.NAME_PLURAL}`}
          Icon={isExpanded ? Icon.CaretUp : Icon.CaretDown}
        />
      </div>
    );
  }
};

FacettedSearch.propTypes = {
  facet: FACET_PROPTYPES,
  previewCount: PropTypes.number,
  showCombobox: PropTypes.bool
};

export default FacettedSearch;
