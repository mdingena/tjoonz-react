import React, { useRef, useState, useEffect } from 'react';
import { useBreakpoints } from '@envato/react-breakpoints';
import { useDispatch } from 'react-redux';
import openDrawer from '../../actions/openDrawer';
import setDetails from '../../actions/setDetails';
import removeMyCollectionsMix from '../../actions/removeMyCollectionsMix';
import { RESULT_DETAILS_DRAWER } from '../../constants/drawers';
import Icon from '../Icon';
import he from 'he';
import PropTypes from 'prop-types';
import styles from './CollectionListItem.module.css';

export const grid = {
  1: styles.oneColumn,
  2: styles.twoColumns,
  3: styles.threeColumns,
  4: styles.fourColumns
};

export const breakpoints = {
  0: 1,
  360: 2,
  460: 3,
  630: 4
};

const CollectionListItem = ({ detailsInDrawer = false, mix, collectionId }) => {
  const { id, thumbnail, title, artists, genres, tags, published } = mix;

  const dispatch = useDispatch();

  const handleDelete = async () => {
    const action = removeMyCollectionsMix(id, collectionId);
    dispatch(action);
  };

  const handleClick = () => {
    if (detailsInDrawer) {
      const drawerAction = openDrawer(RESULT_DETAILS_DRAWER);
      dispatch(drawerAction);
    }

    const detailsAction = setDetails(mix);
    dispatch(detailsAction);
  };

  const fallbackThumbnail =
    'data:image/gif;base64,R0lGODlhRABEAKUyAB4iKB4jKB4jKR8jKR8kKR8kKiAkKiAlKyElKyElLCEmKyEmLCEmLSImLCImLSInLCInLSInLiMnLSMnLiMoLiMoLyQoLyQpLyQpMCUpMCUqMCUqMTxDSz1DTD1ETD1ETVRdZ1RdaFReZ1ReaFVeaFVeaVVfaVZfalZgalZga1dga1dha297h297iHB8iHB8iYuZp4uZqP///////////////////////////////////////////////////////yH5BAEKAD8ALAAAAABEAEQAAAb+wI1wSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq9TM5i8fo/RHPF8fH5ggReGhnwZQ4WHF4ldGnoXFZQUlpaUFo55kXmTlZcUmZsYW50rMamqq6kwKhZ5sKistDGveYpZnrW0MBEUFhYVF7y0v7ClWJEXH8WrLhATFaIezqov0cN9WHkVKtYxMCULEBITEyjgMSbkwHlXyxTqMAYJENER6jH1EO7JVd2+gSNhAIEDBxLSDSzoYAKyKxgmKXQGI0RBcg5OqCOIoB+sXHcwWJAHDsaAeuQg6Dtpj4KjQVS6pSgJ4uSCBRnVhbAJocL+uyrxJhaDAYLAAYMMNIILYbSBtJ8xMVSYMC/AxQcN9Fnt6A7mlG5CeRE9qQCnUms7DZDz+W9KvHkAjCZwwEBf3AMN2Vrp1kEdCwEoH3BQ1wJwy5d7pYatNfaAAgY5lw44sCCCXqARSVqDEaAAgrkOtHpu+DGxN3U11S54sLhW2naIAUqdCU5EAcoMIJx1NuJ25cuyK8xj+QBCaHUsPWIAGVWgNYKUIUSg/dwAZctQg0+AsOCAgQEDAogPMICAdXLmtnP3Dn48efPR/XETSSGCg+7eDejXf5TcBFGW2Ifffvv1lw0nynRTH3c3JYDAZzc50M8wFQiz4E0LOAghThNdOsJcYpNQMEEE95R4TwT/aQNLiCOaWCKKomzChSSUTBNKjaRsQCMol+Cohxd8NILIHiAFKeQjX2gASCB6eCWEkkzu4aQdVFZp5ZVYZqnlllx26eWXYIYp5phkshEEADs=';
  const labels = he.decode([...genres.map(({ name }) => name), ...tags.map(({ name }) => name)].join(', '));

  const thumbnailRef = useRef();
  const [thumbnailRevealed, revealThumbnail] = useState(false);

  const handleThumbnailLoaded = () => revealThumbnail(true);

  useEffect(() => {
    revealThumbnail(false);
  }, [thumbnail]);

  useEffect(() => {
    if (!thumbnailRevealed && thumbnailRef.current && thumbnailRef.current.complete) handleThumbnailLoaded();
  });

  const [columns] = useBreakpoints({
    box: 'content-box',
    widths: breakpoints
  });

  if (!columns) return null;

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <div className={styles.thumbnail}>
          <img
            ref={thumbnailRef}
            key={thumbnail || fallbackThumbnail}
            className={thumbnailRevealed ? styles.thumbnailRevealed : styles.thumbnailLoading}
            src={thumbnail || fallbackThumbnail}
            alt=''
            loading='lazy'
            onLoad={handleThumbnailLoaded}
            width={34}
            height={34}
          />
        </div>
        <button className={styles.trash} onClick={handleDelete} title='Remove from collection'>
          <Icon.TrashAlt className={styles.icon} />
        </button>
      </div>
      <button className={styles.details} onClick={handleClick} type='button'>
        <div className={grid[columns]}>
          <div className={styles.artists} hidden={columns < 2}>
            {he.decode(artists.map(({ name }) => name).join(', '))}
          </div>
          <div className={styles.title}>{title}</div>
          <div className={styles.labels} hidden={columns < 4}>
            {labels}
          </div>
          <div className={styles.published} hidden={columns < 3}>
            {published}
          </div>
        </div>
      </button>
    </div>
  );
};

CollectionListItem.propTypes = {
  detailsInDrawer: PropTypes.bool,
  mix: PropTypes.shape({
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      })
    ).isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      })
    ).isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      })
    ),
    published: PropTypes.string.isRequired
  }).isRequired,
  collectionId: PropTypes.number.isRequired
};

export default CollectionListItem;
