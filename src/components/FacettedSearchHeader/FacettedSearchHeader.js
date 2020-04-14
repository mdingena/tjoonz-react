import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectFacettedSearchFacet from '../../selectors/selectFacettedSearchFacet';
import { FACET_PROPTYPES } from '../../constants/facettedSearchFacets';
import { OR } from '../../constants/facettedSearchRelations.js';
import toggleFacettedSearchRelation from '../../actions/toggleFacettedSearchRelation';
import Icon from '../Icon';
import styles from './FacettedSearchHeader.module.css';

const FacettedSearchHeader = ({ facet }) => {
  const dispatch = useDispatch();
  const { selected, relation } = useSelector(selectFacettedSearchFacet(facet));

  const handleToggle = () => {
    const action = toggleFacettedSearchRelation(facet);
    dispatch(action);
  };

  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <span className={styles.facet}>{facet.NAME_PLURAL}</span>
        {selected.length > 0 && <span className={styles.selected}>{selected.length}</span>}
      </div>
      <button
        className={styles.toggle}
        onClick={handleToggle}
        type='button'
      >
        Any
        <Icon.ToggleOn className={relation === OR ? styles.matchAny : styles.matchAll} />
        All
      </button>
    </div>
  );
};

FacettedSearchHeader.propTypes = {
  facet: FACET_PROPTYPES
};

export default FacettedSearchHeader;
