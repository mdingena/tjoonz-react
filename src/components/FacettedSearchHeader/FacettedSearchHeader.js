import React from 'react';
import { useSelector } from 'react-redux';
import selectFacettedSearchFacet from '../../selectors/selectFacettedSearchFacet';
import { FACET_PROPTYPES } from '../../constants/facettedSearchFacets';
import styles from './FacettedSearchHeader.module.css';

const FacettedSearchHeader = ({ facet }) => {
  const { selected } = useSelector(selectFacettedSearchFacet(facet));

  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <span className={styles.facet}>{facet.NAME_PLURAL}</span>
        {selected.length > 0 && <span className={styles.selected}>{selected.length}</span>}
      </div>
    </div>
  );
};

FacettedSearchHeader.propTypes = {
  facet: FACET_PROPTYPES
};

export default FacettedSearchHeader;
