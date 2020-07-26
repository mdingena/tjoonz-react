import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectFacettedSearchFacet from '../../selectors/selectFacettedSearchFacet';
import { FACETTED_SEARCH_OPTIONS_TTL } from '../../constants/api';
import { FACET_PROPTYPES } from '../../constants/facettedSearchFacets';
import fetchFacettedSearchOptions from '../../actions/fetchFacettedSearchOptions';
import FacettedSearchHeader from '../FacettedSearchHeader';
import FacettedSearchItem from '../FacettedSearchItem';
import Button from '../Button';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import styles from './FacettedSearchList.module.css';

const FacettedSearchList = ({ facet, previewCount = 10 }) => {
  const dispatch = useDispatch();
  const { isFetching, lastUpdated, options } = useSelector(selectFacettedSearchFacet(facet));

  useEffect(() => {
    const updateRequired = lastUpdated < Date.now() - FACETTED_SEARCH_OPTIONS_TTL;

    if (updateRequired) {
      dispatch(fetchFacettedSearchOptions(facet));
    }
  }, [facet, lastUpdated, dispatch]);

  const [isExpanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded((state) => !state);

  const listItems = [
    ...options.slice(0, previewCount),
    ...options.slice(previewCount).sort((a, b) => (a.text > b.text ? 1 : -1))
  ];

  return (
    <div className={styles.root}>
      <FacettedSearchHeader facet={facet} />
      {!isFetching &&
        listItems
          .slice(0, previewCount)
          .map((item, index) => <FacettedSearchItem key={`option-${index}`} facet={facet} item={item} />)}
      {!isFetching &&
        isExpanded &&
        listItems
          .slice(previewCount)
          .map((item, index) => (
            <FacettedSearchItem key={`option-${index + previewCount}`} facet={facet} item={item} />
          ))}
      {!isFetching && (
        <Button
          onClick={handleExpandClick}
          text={`Show ${isExpanded ? 'less' : 'all'} ${facet.NAME_PLURAL}`}
          Icon={isExpanded ? Icon.CaretUp : Icon.CaretDown}
        />
      )}
    </div>
  );
};

FacettedSearchList.propTypes = {
  facet: FACET_PROPTYPES,
  previewCount: PropTypes.number
};

export default FacettedSearchList;
